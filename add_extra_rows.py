import sys
import csv

csv_filename = sys.argv[1]
lookup_filename = sys.argv[2]

csvwriter = csv.writer(sys.stdout)

lsoa_to_lad = {}
lads = []
lads_set = set()
with open(lookup_filename, newline='') as f:
    csvreader = csv.reader(f)
    for i, row in enumerate(csvreader):
        if i == 0:
            continue
        lsoa = row[0]
        lad = row[2]
        if lad not in lads_set:
            lads_set.add(lad)
            lads.append(lad)
        lsoa_to_lad[lsoa] = lad

ew_totals = [0, 0]
lad_totals = {lad: [0,0] for lad in lads}

with open(csv_filename, newline='') as f:
    csvreader = csv.reader(f)
    for i, row in enumerate(csvreader):
        if i == 0:
            csvwriter.writerow(["GEOGRAPHY_CODE", "TOTAL", "COUNT"])
        else:
            csvwriter.writerow(row)
            lsoa = row[0]
            lad = lsoa_to_lad[lsoa]
            lad_totals[lad][0] += int(row[1])
            lad_totals[lad][1] += int(row[2])
            ew_totals[0] += int(row[1])
            ew_totals[1] += int(row[2])

for lad in lads:
    csvwriter.writerow([lad] + lad_totals[lad])

csvwriter.writerow(["EW"] + ew_totals)
