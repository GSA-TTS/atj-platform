#!/bin/bash
# default values
STORYBOOK_PORT=9009
CONTAINER_NAME="e2e"
BUILD_TARGET="test"
BASE_PATH=$(dirname $0)
FUNCS=""

# Parse flag parameters
while getopts "p:c:f:t:" flag
do
    case "${flag}" in
        p) STORYBOOK_PORT=${OPTARG};;
        c) CONTAINER_NAME=${OPTARG};;
        f) FUNCS="$FUNCS ${OPTARG}";;
        t) BUILD_TARGET="${OPTARG}";;
    esac
done

build_container() {
    if [[ $BUILD_TARGET != "serve" ]] && [[ $BUILD_TARGET != "test" ]]; then
        echo "Invalid BUILD_TARGET! It should be either 'serve' or 'test.' You need to pass these values in with the -t flag (e.g. -t serve)."
        exit 1
    fi

    docker build --tag 'playwright' . -f $BASE_PATH/../Dockerfile --progress=plain --target $BUILD_TARGET
}

run_container() {
    docker run -p 4321:4321 -p $STORYBOOK_PORT:$STORYBOOK_PORT --name $CONTAINER_NAME -v $(dirname $0)/../../:/srv/apps/atj-platform -it --rm playwright
}

end_to_end() {
    docker exec -w /srv/apps/atj-platform/e2e -it $CONTAINER_NAME pnpm playwright test
}

interaction() {
    docker exec -it $CONTAINER_NAME pnpm --filter=end-to-end-tests test:storybook --url http://localhost:$STORYBOOK_PORT --config-dir ../packages/design/.storybook/ --browsers firefox chromium
}

if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker to run this script."
    exit 1
fi


if [ -z "$FUNCS" ]; then
    end_to_end
    interaction
else
    for FUNC in $FUNCS; do
        case $FUNC in
            "build_container") build_container ;;
            "run_container") run_container ;;
            "interaction") interaction ;;
            "end_to_end") end_to_end ;;
            *) echo "Invalid flag: ${FUNC}. Ignored." ;;
        esac
    done
fi
