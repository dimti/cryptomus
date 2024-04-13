#!/bin/bash
QUICK_DIR=quick

if [[ ! -d $QUICK_DIR ]]; then
  echo "Quick dir not exists: ${QUICK_DIR}"
  exit 1
fi

cd $QUICK_DIR

find ./ -name "*.sh.example" -exec sh -c 'F={}; cp -u $F ${F%.example}' \;

find ./ -name "*.sh" -exec sh -c 'F={}; chmod +x ${F}' \;
