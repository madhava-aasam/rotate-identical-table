const { format } = require("@fast-csv/format");

// Returns - an array of identical number of rows and columns Or false
function getIdenticalTable(list) {
  let isValid = false,
    requiredTable;

  try {
    for (let tblSize = Math.ceil(list.length / 2); tblSize > 0; tblSize--) {
      requiredTable = generateTable(list, tblSize);

      isValid = doesTableHaveIdenticalRowsAndColumns(requiredTable);
      if (isValid) {
        break;
      }
    }

    if (!isValid) {
      return isValid;
    }
    return requiredTable;
  } catch (error) {
    console.error("error in getIdenticalTable", error);
    throw error;
  }
}

function doesTableHaveIdenticalRowsAndColumns(tblArray) {
  try {
    const tableRows = tblArray.length;
    const isInvalid = tblArray.some((a) => a.length !== tableRows);
    return !isInvalid;
  } catch (error) {
    console.error("error in doesTableHaveIdenticalRowsAndColumns", error);
    throw error;
  }
}

function generateTable(list, itemsPerColumn) {
  var table = [],
    i,
    row;

  try {
    for (i = 0, row = -1; i < list.length; i++) {
      if (i % itemsPerColumn === 0) {
        row++;
        table[row] = [];
      }

      table[row].push(list[i]);
    }
    return table;
  } catch (error) {
    console.error("error in getTable", error);
    throw error;
  }
}

function rotateTable(tbl) {
  try {
    // Since it is identical table table rows and columns are equal
    const tableSize = tbl.length;
    let rowCount = tbl.length;
    let columnCount = tbl.length;

    let row = 0,
      col = 0;
    let prev, curr;

    /*
      row - Starting row index
      rowCount - ending row index
      col - starting column index
      columnCount - ending column index
      i - iterator
    */

    while (row < rowCount && col < columnCount) {
      if (row + 1 == rowCount || col + 1 == columnCount) break;

      // Store the first element of next
      // row, this element will replace
      // first element of current row
      prev = tbl[row + 1][col];

      // Move elements of first row
      // from the remaining rows
      for (let i = col; i < columnCount; i++) {
        curr = tbl[row][i];
        tbl[row][i] = prev;
        prev = curr;
      }
      row++;

      // Move elements of last column
      // from the remaining columns
      for (let i = row; i < rowCount; i++) {
        curr = tbl[i][columnCount - 1];
        tbl[i][columnCount - 1] = prev;
        prev = curr;
      }
      columnCount--;

      // Move elements of last row
      // from the remaining rows
      if (row < rowCount) {
        for (let i = columnCount - 1; i >= col; i--) {
          curr = tbl[rowCount - 1][i];
          tbl[rowCount - 1][i] = prev;
          prev = curr;
        }
      }
      rowCount--;

      // Move elements of first column
      // from the remaining rows
      if (col < columnCount) {
        for (let i = rowCount - 1; i >= row; i--) {
          curr = tbl[i][col];
          tbl[i][col] = prev;
          prev = curr;
        }
      }
      col++;
    }

    // Publish rotated table
    const rotatedTableData = [];
    for (let i = 0; i < tableSize; i++) {
      for (let j = 0; j < tableSize; j++) {
        rotatedTableData.push(tbl[i][j]);
      }
    }
    return rotatedTableData;
  } catch (error) {
    console.error("error in rotateTable", error);
    throw error;
  }
}

function getRotatedTableResult(dataRow) {
  try {
    let rotatedTableResult = [],
      isValid = false;

    const tableElements =
      typeof dataRow[1] == "string" ? JSON.parse(dataRow[1]) : dataRow[1];
    const identicalTable = getIdenticalTable(tableElements);

    if (identicalTable != false) {
      rotatedTableResult = rotateTable(identicalTable);
      isValid = true;
    }

    return { id: dataRow[0], json: rotatedTableResult, is_valid: isValid };
  } catch (error) {
    console.error("error in getRotatedTableResult", error);
    throw error;
  }
}

function writeToStream(rotatedTablesData) {
  try {
    const stream = format({ delimiter: "," });
    stream.pipe(process.stdout);

    // header
    stream.write(["id", "json", "is_valid"]);

    rotatedTablesData.forEach((item) => {
      const rotatedTableData = "[" + item.json + "]";
      stream.write([item.id, rotatedTableData, item.is_valid]);
    });

    stream.end();
  } catch (error) {
    console.log("error in writeToStream", error);
    throw error;
  }
}

module.exports = { getRotatedTableResult, writeToStream };
