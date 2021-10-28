This is based on https://github.com/bothness/census-atlas

The script `check-row-order.sh` checks that all the CSV files in `data/lsoa/` have
identical first columns.

`add-extra-rows.sh` adds rows for LADs and England and Wales by aggregating LSOA
values.  (I think the lookup file is best fit?)

`remove-columns.sh` creates one- and two-column versions of the files created
by `add-extra-rows.sh`.
