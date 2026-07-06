#!/bin/bash

set -e

node /app/backend/src/server.js &

until curl -fs http://localhost:3000/api/health > /dev/null
do 
  sleep 1
done

exec nginx -g "daemon off;"
