#!/usr/bin/env sh
set -e

npm ci
npm run build
pm2 start ecosystem.config.js --update-env
pm2 save
