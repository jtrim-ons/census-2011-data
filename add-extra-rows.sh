#!/bin/bash

mkdir -p data-with-lad-and-ew-rows

for f in data/lsoa/*; do
    b=$(basename $f)
    echo $b
    python3 add_extra_rows.py $f data/lsoa2011_lad2020.csv > data-with-lad-and-ew-rows/$b
done
