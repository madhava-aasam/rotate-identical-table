# Rotate identical table
Rotates a table with an identical number of rows and columns.

---
## Prerequirements

### Node & NPM (latest stable version)
  Official Node.js website](https://nodejs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.9.3

    $ npm --version
    6.14.8


---

## Commands
### Install

    $ git clone https://github.com/madhava-aasam/rotate-identical-table
    $ cd rotate-identical-table
    $ npm install

### Running the project
    
    $ node index.js [input file path] > [output file path]
    e.g. $ node index.js input.csv > output.csv

### Running tests

    $ npm test

--- 

## What is implemented?
### Basics

#### Does the program run?
    Yes
#### Does it read and output data we would like it to?
    Yes
#### Is it properly formatted?
    Yes

### Completeness

#### Does it handle all the cases, including differing numbers of rows and columns,bigger and smaller tables, error cases you might come up with?
    It handles all the cases, including differing numbers of rows and columns,bigger and smaller tables. But error cases such as invalid input are not handled. 
#### For the cases you are handling, are you handling them correctly?
    Yes
#### How do you know this?
    I have tested with different input data and also ran unit tests (included in the repo). 
#### Did you test against sample data? If so, please include it alongside your code.
    Yes, included 'SampleData.csv' in the repo. Also you can find test data below.
##### Input
    id, json
    1, "[1, 2, 3, 4, 5, 6, 7, 8, 9]"
    2, "[40, 20, 90, 10]"
    3, "[-5]"
    9, "[2, -0]"
    5, "[2, -5, -5]"
    8, "[1, 1, 1, 1, 1]"
    10, "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]"
    11, "[]"
    14, "["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]"
    547, "["", "#", "c", 7, "p", "f", 8, "", "", "j", "$", "z", 785, "n", "x", 804]"
    88,  "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]"

##### Output
    id, json, is_valid
    1,  "[4, 1, 2, 7, 5,3, 8, 9, 6]", true
    2, "[ 90, 40, 10, 20 ]", true
    3, "[-5]", true
    9, "[]", false
    5, "[]", false
    8, "[]", false
    10, "[5,  1,  2,  3, 9, 10, 6,  4, 13, 11, 7,  8, 14, 15, 16, 12]", true
    11, "[]", false
    14, "["e", "a", "b", "c","i", "j", "f", "d","m", "k", "g", "h","n", "o", "p", "l"]", true
    547, "["p", "",  "#", "c", "", "j", "f", 7,   785, "$", 8,   "",  "n", "x", 804, "z"]", true
    88, "[6, 1, 2, 3, 4, 11, 12, 7, 8, 5, 16, 17, 13, 9, 10, 21, 18, 19, 14, 15, 22, 23, 24, 25, 20]", true


#### Did you write unit tests?
    Yes
    
##### How to run?
    $npm test

