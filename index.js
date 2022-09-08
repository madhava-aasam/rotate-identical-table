var fs = require("fs");
var { parse } = require("csv-parse");
const { getRotatedTableResult, writeToStream } = require("./tableHelper");

var arguments = process.argv;
let inputFilePath = arguments[2];

const inputFileExt = inputFilePath.substring(inputFilePath.length - 3, inputFilePath.length);
if (!inputFilePath || inputFileExt != "csv") {
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
