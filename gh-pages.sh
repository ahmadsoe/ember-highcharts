#!/bin/bash

cd $(dirname $0)
GH_PAGES_DIR=./gh-pages
ember build --environment=production && \
rm -rf ${GH_PAGES_DIR}/* && \
cp -R dist/* ${GH_PAGES_DIR}/ && \
cd ${GH_PAGES_DIR} && \
git add -A && \
git commit -m 'Update GitHub pages' && \
git push origin gh-pages:gh-pages
