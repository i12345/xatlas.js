#!/bin/bash

set -e

export OPTIMIZE="-O3"
export LDFLAGS="${OPTIMIZE}"
export CFLAGS="${OPTIMIZE}"
export CPPFLAGS="${OPTIMIZE}"

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="
(

  mkdir -p source/esm/build

  # Compile C/C++ code
  emcc \
    -std=c++1y \
    -DXA_MULTITHREADED=0 \
    ${OPTIMIZE} \
    --bind \
    --no-entry \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s EXPORT_ES6=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="createXAtlasModule" \
    --closure 1 \
    -o ./source/esm/build/xatlas.js \
    --js-library ./source/esm/jslib.js \
    source/esm/*.cpp \
    source/xatlas/xatlas.cpp \
\
    -s ASSERTIONS=1 \
    -DNDEBUG \
#    -s TOTAL_MEMORY=278mb \
#    -D SANITIZE_ADDRESS_CHECK \
#    -fsanitize=address \
#    -g3
#    Uncomment above line for leak checking

  # Move artifacts
  rm -rf dist
  mkdir -p dist
  cp source/esm/build/xatlas.{js,wasm} dist
  cp source/esm/index.js dist

)
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="
