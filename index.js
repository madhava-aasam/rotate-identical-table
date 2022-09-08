var fs = require("fs");
var { parse } = require("csv-parse");
const { getRotatedTableResult, writeToStream } = require("./tableHelper");

var arguments = process.argv;
let inputFilePath = arguments[2];

if (!inputFilePath || inputFilePath.substring(0, inputFilePath.length - 3) != "csv") {
  console.log("Please input csv file");
  return;
}

const rotatedTablesData = [];
fs.createReadStream(inputFilePath)
  .pipe(
    parse({
      delimiter: ",",
    })
  )
  .on("data", (dataRow) => {
    // skip file header
    if (dataRow[0] != "id") {
      const rotatedTableData = getRotatedTableResult(dataRow);
      rotatedTablesData.push(rotatedTableData);
    }
  })
  .on("end", () => {
    writeToStream(rotatedTablesData);
  });
