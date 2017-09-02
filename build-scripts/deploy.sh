#!/usr/bin/env sh

set -e

echo "$key" | base64 -d > key
chmod 600 key

mkdir deploy_target
cp backend/target/slothyx-1.0-SNAPSHOT.war deploy_target/ROOT.war
cp build-scripts/run_on_server.sh deploy_target/run_on_server.sh

scp -P 22222 -i key -r -o StrictHostKeyChecking=no deploy_target travis@dev.slothyx.com:deploy_target

ssh travis@dev.slothyx.com -p 22222 -i key -o StrictHostKeyChecking=no "deploy_target/deploy_on_server.sh"

rm -f key