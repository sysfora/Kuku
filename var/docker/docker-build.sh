#!/bin/bash

set -o xtrace

docker rmi localhost/kuku || true
docker build --target dist -t localhost/kuku -f Dockerfile.dev .
docker build --target devcontainer -t localhost/kuku-devcontainer -f Dockerfile.dev .
