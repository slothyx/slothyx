#!/usr/bin/env sh

docker login -u "$REGISTRY_USER" -p "$REGISTRY_PASSWORD" registry.slothyx.com
docker push registry.slothyx.com/slothyx
docker logout registry.slothyx.com