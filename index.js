var fs = require("fs");
var { parse } = require("csv-parse");
const { getRotatedTableResult } = require("./tableHelper");

var arguments = process.argv;
let filePath = arguments[2];

// Todo review again
if (!filePath) {
  filePath = __dirname + "/numbs.csv";
}

fs.createReadStream(filePath)
  .pipe(
    parse({
      delimiter: ",",
    })
  )
  .on("data", (dataRow) => {
    if (dataRow[0] != "id") {
      console.log(
        "------------------------------------------------------------------------------"
      );
      console.log("\nInput table elements: ", dataRow);

      const result = getRotatedTableResult(dataRow);

      console.log("result ---", result);
    }
  })
  .on("end", () => {
    console.log(
      "***************************csv parsing ompleted***************************"
    );
  });
