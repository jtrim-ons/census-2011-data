#!/bin/bash

mkdir -p data-with-lad-and-ew-rows-2-cols
mkdir -p data-with-lad-and-ew-rows-1-col

for f in data-with-lad-and-ew-rows/*; do
    b=$(basename $f)
    echo $b
    xsv select 2-3 $f > data-with-lad-and-ew-rows-2-cols/$b
    xsv select 3 $f > data-with-lad-and-ew-rows-1-col/$b
done
