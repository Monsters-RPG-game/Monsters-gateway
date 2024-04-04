#!/bin/bash
echo "Initializing database"

npm run migrate:init

echo "Running migration"

npm run migrate:latest

echo "Starting service"

node ./src/main.js
