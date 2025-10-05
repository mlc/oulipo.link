#!/bin/sh

set -ex

yarn check-types
yarn prod

export AWS_PAGER=""

set +e
for i in dist/*.woff2; do
  aws s3api put-object --bucket prod.oulipo.link --key u/`basename $i` --if-none-match '*' --content-type 'font/woff2' --cache-control 'public,max-age=15552000,immutable' --body $i
done
set -e
for i in dist/*.css; do
  aws s3 cp $i s3://prod.oulipo.link/u/ --content-type 'text/css' --cache-control 'public,max-age=31556952,immutable'
done
for i in dist/*.js; do
  aws s3 cp $i s3://prod.oulipo.link/u/ --content-type 'application/javascript' --cache-control 'public,max-age=31556952,immutable'
done
for i in dist/*.map; do
  aws s3 cp $i s3://prod.oulipo.link/u/ --content-type 'application/json' --cache-control 'public,max-age=31556952,immutable'
done
aws s3 cp dist/index.html s3://prod.oulipo.link/u/index.html --content-type 'text/html;charset=utf-8' --cache-control 'public,max-age=3600'
aws cloudfront create-invalidation --distribution-id E1D2RK0BMMLKK5 --paths / /index.html
