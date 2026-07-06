#!/bin/bash

set -e

node /app/backend/src/server.js &

exec nginx -g "daemon off;"
