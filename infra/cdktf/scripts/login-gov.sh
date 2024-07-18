#!/bin/bash
#
# This script will bootstrap the creation of a login.gov app.
#

#set -eo pipefail

INFRA_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )/.." &> /dev/null && pwd)

usage()
{
    cat << EOF
Manage a login.gov application.

Usage: manage.sh <OPERATION> -a <login.gov app name>

OPERATION:
    setup               create a new login.gov certificate

Options:
  -a, --app app_name    Login.gov application name
  -h                    Print usage
EOF
}

validate_parameters()
{
  if [ -z ${operation+x} ]; then
    printf "${RED}Please supply an operation.\n${NC}"
    usage
    exit 1
  fi

  if [ -z ${app_name+x} ]; then
    printf "${RED}Please provide an application name.\n${NC}"
    usage
    exit 1
  fi
}

setup() {
  create_certs
}

create_certs() {
  mkdir -p ${INFRA_DIR}/secrets
  echo "Writing ${app_name} certificate to ${INFRA_DIR}/secrets"
  openssl req \
          -nodes \
          -x509 \
          -days 365 \
          -newkey rsa:2048 \
          -new \
          -subj "/C=US/O=General Services Administration/OU=TTS/CN=gsa.gov" \
          -keyout ${INFRA_DIR}/secrets/login-gov-${app_name}-key.pem \
          -out ${INFRA_DIR}/secrets/login-gov-${app_name}-cert.pem
}

while [ "$1" != "" ]; do
  case $1 in
    setup )  operation=$1
                                ;;
    -a | --application )        shift
                                app_name=$1
                                ;;
    * )                         usage
                                exit 1
  esac
  shift
done

validate_parameters

case $operation in
  setup )                         setup
                                  ;;
  * )                             usage
                                  exit 1
esac
