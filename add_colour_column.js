var fs = require('fs');
var Papa = require('papaparse');
var ss = require('simple-statistics');

var file = process.argv[2];

//console.log(fs.readFileSync(file, "utf8"));
var data = Papa.parse(fs.readFileSync(file, "utf8"), {header: true, skipEmptyLines: true}).data;
//console.log(data[0]);

var proportions = data
    .filter(d => d.GEOGRAPHY_CODE.slice(0, 3) === "E01")
    .map(d => +d.COUNT / +d.TOTAL);

let chunks = ss.ckmeans(proportions, 5);
let lastChunk = chunks[chunks.length - 1];

let breaks = chunks.map(chunk => chunk[0]);
breaks.push(lastChunk[lastChunk.length - 1]);

data.forEach(d => {
    let proportion = +d.COUNT / +d.TOTAL;
    for (let i=0; i<4; i++) {
        if (proportion <= breaks[i + 1]) {
            d.COLOUR = i;
            return;
        }
        d.COLOUR = 4;
    }
});

console.log("GEOGRAPHY_CODE,TOTAL,COUNT,COLOUR");
for (let row of data) {
    console.log(`${row.GEOGRAPHY_CODE},${row.TOTAL},${row.COUNT},${row.COLOUR}`);
}
for (let i=0; i<breaks.length; i++) {
    console.log(`breaks${i},-1,-1,${breaks[i]}`);
}
