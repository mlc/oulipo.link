#!/bin/sh

set -ex

yarn prod
for i in dist/*.css; do
  aws s3 cp $i s3://prod.oulipo.link/u/ --content-type 'text/css' --cache-control 'public, max-age=31556952, immutable'
done
for i in dist/*.js; do
  aws s3 cp $i s3://prod.oulipo.link/u/ --content-type 'application/javascript' --cache-control 'public, max-age=31556952, immutable'
done
aws s3 cp dist/index.html s3://prod.oulipo.link/u/index.html --content-type 'text/html;charset=utf-8' --cache-control 'public, max-age=3600'
aws cloudfront create-invalidation --distribution-id E1D2RK0BMMLKK5 --paths / /index.html
