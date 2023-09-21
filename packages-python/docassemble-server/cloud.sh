#!/bin/bash
#
# This script will bootstrap the creation of a cloud.gov deployment
# environment, to be managed via Terraform.
#

#set -eo pipefail

CMS_SERVICE=cms-service
DEPLOY_USER=a2j-deployer
DEPLOY_USER_KEY=${DEPLOY_USER}-key

usage()
{
    cat << EOF
Manage a cloud.gov deployment environment.

Usage: cloud.sh <OPERATION> -o <cloud.gov organization name> -s <cloud.gov space name>

OPERATION:
    setup   - create a new cloud.gov space
    show    - show Terraform S3 and cloud.gov credentials
    export  - when used with source, exports credentials to the environment
    deploy  - deploy the locally-built application via the Cloudfoundry CLI
    rotate  - replace current secrets with new secrets

Options:
  -o, --organization organization_name   Cloud.gov organization name
  -s, --space space_name                 Cloud.gov space name
  -h                                     Print usage
EOF
}

validate_parameters()
{
  if [ -z ${operation+x} ]; then
    printf "${RED}Please supply an operation.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${organization_name+x} ]; then
    printf "${RED}Please provide an organization name.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${space_name+x} ]; then
    printf "${RED}Please provide a space name.\n${NC}"
    usage
    exit 1
  fi
}

space_exists() {
  cf space "$1" >/dev/null 2>&1
}

service_exists() {
  cf service "$1" >/dev/null 2>&1
}

service_key_exists() {
  cf service-key "$1" "$2" >/dev/null 2>&1
}

export_service_key() {
  echo "Querying for ${DEPLOY_USER_KEY}..."
  SERVICE_KEY=$(cf service-key ${DEPLOY_USER} ${DEPLOY_USER_KEY} | tail -n +2)
  echo "Exporting ${DEPLOY_USER_KEY} CF_USER, CF_PASSWORD..."
  export CF_USER=$(echo $SERVICE_KEY | jq -r .username)
  export CF_PASSWORD=$(echo $SERVICE_KEY | jq -r .password)
}

export_environment() {
  export_service_key
}

setup() {
  if space_exists "${space_name}" ; then
    echo space "${space_name}" already created
  else
    cf create-space ${space_name} -o ${organization_name}
  fi

  if service_exists "${DEPLOY_USER}" ; then
    echo ${DEPLOY_USER} already created
  else
    cf create-service cloud-gov-service-account space-deployer ${DEPLOY_USER}
  fi

  setup_keys

  export_environment
}

setup_keys() {
  if service_key_exists "${DEPLOY_USER}" "${DEPLOY_USER_KEY}" ; then
    echo ${DEPLOY_USER_KEY} already created
  else
    echo "Creating ${DEPLOY_USER_KEY}..."
    cf create-service-key ${DEPLOY_USER} ${DEPLOY_USER_KEY}
  fi

  echo "To see service keys, execute './cloud.sh'"
}

update_keys() {
  if service_key_exists "${DEPLOY_USER}" "${DEPLOY_USER_KEY}" ; then
      echo ${DEPLOY_USER_KEY} exists, deleting and recreating
      cf delete-service-key ${DEPLOY_USER} ${DEPLOY_USER_KEY}
      cf create-service-key ${DEPLOY_USER} ${DEPLOY_USER_KEY}
  else
      echo ${DEPLOY_USER_KEY} does not exist
  fi
}

print_service_key() {
  cf service-key ${DEPLOY_USER} ${DEPLOY_USER_KEY}
}

show() {
  print_service_key
}

deploy() {
  export_environment
  cf push -f manifest.yml
}

rotate() {
  update_keys
  cat << EOF


You need to update CI/CD github secrets with ./cloud.sh show

  a2j-deployer-key.password => CF_PASSWORD_ENV
  a2j-deployer-key.username => CF_USER_ENV
EOF
}

while [ "$1" != "" ]; do
  case $1 in
    rotate | setup | show | export | deploy )  operation=$1
                                ;;
    -o | --organization )       shift
                                organization_name=$1
                                ;;
    -s | --space )              shift
                                space_name=$1
                                ;;
    -h | --help )               usage
                                exit
                                ;;
    * )                         usage
                                exit 1
  esac
  shift
done

validate_parameters

# Target all operations to the provided organization/space pair.
cf target -o ${organization_name} -s ${space_name}

case $operation in
  rotate )                        rotate
                                  ;;
  setup )                         setup
                                  ;;
  show )                          show
                                  ;;
  export )                        export_environment
                                  ;;
  deploy )                        deploy
                                  ;;
  * )                             usage
                                  exit 1
esac
