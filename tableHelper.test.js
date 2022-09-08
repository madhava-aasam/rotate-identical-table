const { getRotatedTableResult } = require("./tableHelper");

const getIdenticalTableTestData = [
  {
    id: 1,
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    expectedOutput: { json: [4, 1, 2, 7, 5, 3, 8, 9, 6], isValid: true },
  },
  {
    id: 2,
    input: [40, 20, 90, 10],
    expectedOutput: { json: [90, 40, 10, 20], isValid: true },
  },
  {
    id: 3,
    input: [-5],
    expectedOutput: {
      json: [-5],
      isValid: true,
    },
  },
  {
    id: 9,
    input: [2, -0],
    expectedOutput: {
      json: [],
      isValid: false,
    },
  },
  {
    id: 5,
    input: [2, -5, -5],
    expectedOutput: {
      json: [],
      isValid: false,
    },
  },
  {
    id: 8,
    input: [1, 1, 1, 1, 1],
    expectedOutput: {
      json: [],
      isValid: false,
    },
  },
  {
    id: 10,
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    expectedOutput: {
      json: [5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12],
      isValid: true,
    },
  },
  {
    id: 11,
    input: [],
    expectedOutput: {
      json: [],
      isValid: false,
    },
  },
  {
    id: 14,
    input: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
    ],
    expectedOutput: {
      json: [
        "e",
        "a",
        "b",
        "c",
        "i",
        "j",
        "f",
        "d",
        "m",
        "k",
        "g",
        "h",
        "n",
        "o",
        "p",
        "l",
      ],
      isValid: true,
    },
  },
  {
    id: 547,
    input: [
      "",
      "#",
      "c",
      7,
      "p",
      "f",
      8,
      "",
      "",
      "j",
      "$",
      "z",
      785,
      "n",
      "x",
      804,
    ],
    expectedOutput: {
      json: [
        "p",
        "",
        "#",
        "c",
        "",
        "j",
        "f",
        7,
        785,
        "$",
        8,
        "",
        "n",
        "x",
        804,
        "z",
      ],
      isValid: true,
    },
  },
];

describe("getRotatedTableResult tests", () => {
  test.each(getIdenticalTableTestData)(
    "$id - $input test",
    ({ id, input, expectedOutput }) => {
      const actualResult = getRotatedTableResult([id, input]);

      expect(actualResult.json).toStrictEqual(expectedOutput.json);
      expect(actualResult.is_valid).toStrictEqual(expectedOutput.isValid);
    }
  );
});
