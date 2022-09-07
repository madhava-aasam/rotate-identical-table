const { getRotatedTableResult } = require("./tableHelper");

const getIdenticalTableTestData = [
  [1, [1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 1, 2, 7, 5, 3, 8, 9, 6]],
  [2, [40, 20, 90, 10], [90, 40, 10, 20]],
  [3, [-5], [-5]],
  [9, [2, -0], []],
  [5, [2, -5, -5], []],
  [8, [1, 1, 1, 1, 1], []],
  [
    10,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12],
  ],
  [11, [], []],
];

describe("getIdenticalTable tests", () => {
  test.each(getIdenticalTableTestData)(
    "%i - %s test",
    (id, input, expectedOutput) => {
      const actualResult = getRotatedTableResult([id, input]);

      expect(actualResult.json).toStrictEqual(expectedOutput);
    }
  );
});
