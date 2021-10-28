#!/bin/bash

mkdir -p data-with-lad-and-ew-rows-and-colours

for f in data-with-lad-and-ew-rows/*; do
    b=$(basename $f)
    echo $b
    node add_colour_column.js $f > data-with-lad-and-ew-rows-and-colours/$b
done
