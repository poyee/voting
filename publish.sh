#!/bin/bash

set -e
npm run build:ssr
docker build -t gcr.io/voting-360804/voting .
docker push gcr.io/voting-360804/voting
