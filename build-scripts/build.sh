#!/usr/bin/env sh

set -e

cd frontend
npm run build

cd ..
mkdir -p backend/src/main/resources/static/
cp -r frontend/app/dist/* backend/src/main/resources/static/

cd backend
mvn package

cd ..
docker build -t registry.slothyx.com/slothyx .