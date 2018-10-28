#!/usr/bin/env sh

set -e

cd frontend
npm run build

cd ..
mkdir -p backend/src/main/webapp/
cp -r frontend/app/dist/* backend/src/main/webapp/

cd backend
mvn package

cd ..
docker build -t registry.slothyx.com/slothyx .