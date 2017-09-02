#!/usr/bin/env sh

cd frontend
gulp prod

cd ..
cp -r frontend/app/dist backend/src/main/webapp

cd backend
mvn package