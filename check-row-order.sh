#!/bin/bash

for f in data/lsoa/*; do
    diff <(xsv select 1 $f) <(xsv select 1 data/lsoa/QS101EW001.csv)
done
