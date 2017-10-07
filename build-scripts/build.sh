#!/usr/bin/env sh

cd frontend
npm run gulp-build

cd ..
cp -r frontend/app/dist/* backend/src/main/webapp/

cd backend
mvn package

cd ..
docker build -t registry.slothyx.com/slothyx .