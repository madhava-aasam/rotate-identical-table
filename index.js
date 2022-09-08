var fs = require("fs");
var { parse } = require("csv-parse");
const { getRotatedTableResult, writeToCsv } = require("./tableHelper");

var arguments = process.argv;
let filePath = arguments[2];

if (!filePath || filePath.substring(0, filePath.length - 3) != "csv") {
  console.log("Please provide input csv file");
  return;
}

const outputData = [];
fs.createReadStream(filePath)
  .pipe(
    parse({
      delimiter: ",",
    })
  )
  .on("data", (dataRow) => {
    // skip file header
    if (dataRow[0] != "id") {
      const result = getRotatedTableResult(dataRow);
      outputData.push(result);
    }
  })
  .on("end", () => {
    writeToCsv(outputData);
  });
