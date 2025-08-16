/**
 * @param {number[][]} value - The original value (1, 0, or -1).
 * @param {number[][]} numFlips - The number of times to apply the transformation.
 * @returns {number[][]} The new value after the transformation.
 * @description
 * This function calculates the new value of a cell after a certain number of transformations.
 * The transformation is 1 -> 0, 0 -> -1, -1 -> 1. This cycle repeats every 3 flips.
 * The total number of flips for a cell is the sum of its row and column flips.
 */
function applyTransformation(value, numFlips) {
  const transformationMap = {
    1: [1, 0, -1],
    0: [0, -1, 1],
    "-1": [-1, 1, 0],
  };
  return transformationMap[value.toString()][numFlips];
}

/**
 * @param {number[][]} grid - The 4x4 grid of numbers.
 * @param {number[]} rowFlips - An array of 4 integers representing the number of flips for each row (0, 1, or 2).
 * @param {number[]} colFlips - An array of 4 integers representing the number of flips for each column (0, 1, or 2).
 * @returns {number} The total score of the grid after the specified transformations.
 * @description
 * This function calculates the total score of a grid given a set of row and column transformations.
 * The score is the sum of all cell values in the transformed grid.
 */
function calculateScore(grid, rowFlips, colFlips) {
  let totalScore = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      // The total number of transformations for a cell is the sum of the row and column flips, modulo 3.
      const totalFlips = (rowFlips[i] + colFlips[j]) % 3;
      const originalValue = grid[i][j];
      totalScore += applyTransformation(originalValue, totalFlips);
    }
  }
  return totalScore;
}

/**
 * @param {number[][]} grid - The starting 4x4 grid.
 * @returns {{maxScore: number, bestFlips: {type: string, index: number, count: number}[]}}
 * An object containing the maximum score and the corresponding flips.
 * @description
 * This is the main function that finds the maximum possible score.
 * It uses a brute-force approach to check every possible combination of
 * row and column flips. It now also stores and returns the combination of
 * flips that results in the maximum score in a single array.
 */
function findMaxScore(grid) {
  let maxScore = -Infinity;
  let bestRowFlips = [0, 0, 0, 0];
  let bestColFlips = [0, 0, 0, 0];

  // To efficiently iterate through all combinations of flips, we can use a loop
  // from 0 to 3^7 - 1 (2187 - 1) and convert the index to a base-3 number.
  const numCombinations = Math.pow(3, 7);

  for (let i = 0; i < numCombinations; i++) {
    let tempIndex = i;

    // Initialize flip arrays
    const rowFlips = [0, 0, 0, 0];
    const colFlips = [0, 0, 0, 0];

    // The first row's flips can be fixed to 0, since all other flip choices
    // are relative to it. This reduces the search space from 3^8 to 3^7.
    rowFlips[0] = 0;

    // Populate the remaining flip counts from the base-3 representation of the loop index
    rowFlips[1] = tempIndex % 3;
    tempIndex = Math.floor(tempIndex / 3);
    rowFlips[2] = tempIndex % 3;
    tempIndex = Math.floor(tempIndex / 3);
    rowFlips[3] = tempIndex % 3;
    tempIndex = Math.floor(tempIndex / 3);
    colFlips[0] = tempIndex % 3;
    tempIndex = Math.floor(tempIndex / 3);
    colFlips[1] = tempIndex % 3;
    tempIndex = Math.floor(tempIndex / 3);
    colFlips[2] = tempIndex % 3;
    tempIndex = Math.floor(tempIndex / 3);
    colFlips[3] = tempIndex % 3;

    const currentScore = calculateScore(grid, rowFlips, colFlips);
    if (currentScore > maxScore) {
      maxScore = currentScore;
      bestRowFlips = [...rowFlips];
      bestColFlips = [...colFlips];
    }
  }

  // Combine the best row and column flips into a single array of steps.
  const bestFlips = [];
  bestRowFlips.forEach((count, index) => {
    if (count > 0) {
      bestFlips.push({ type: "Row", index: index + 1, count: count });
    }
  });
  bestColFlips.forEach((count, index) => {
    if (count > 0) {
      bestFlips.push({ type: "Column", index: index + 1, count: count });
    }
  });

  return {
    maxScore,
    bestFlips,
  };
}

/**
 * @param {{type: string, index: number, count: number}[]} flips - An array of flip objects.
 * @returns {string} A formatted string of the steps.
 * @description
 * This is a helper function to format the output of the steps for easy readability.
 */
function displaySteps(flips) {
  if (flips.length === 0) {
    return "No flips are needed to achieve the maximum score.";
  }
  return flips
    .map((step) => `${step.type} ${step.index}: Flip ${step.count} time(s)`)
    .join(", ");
}

// Example usage with your provided grid
const myGrid = [
  [1, 1, 1, -1],
  [-1, 1, 1, 1],
  [1, 1, -1, 1],
  [1, -1, 1, 1],
];

const result = findMaxScore(myGrid);

console.log(
  `The maximum possible score for the given grid is: ${result.maxScore}`,
);
console.log(`Steps to achieve this score:`);
console.log(`  ${displaySteps(result.bestFlips)}`);

/**
 * @param {number} minScore - The minimum score to look for.
 * @param {number} numGridsToFind - The number of grids to find.
 * @returns {{grid: number[][], maxScore: number}[]} An array of objects with the grid and its max score.
 * @description
 * This function generates random 4x4 grids and finds those with a maximum
 * possible score greater than or equal to `minScore`.
 */
function findGridsWithMaxScoreAbove(minScore, numGridsToFind) {
  const foundGrids = [];
  let attempts = 0;
  const maxAttempts = 10000;

  while (foundGrids.length < numGridsToFind && attempts < maxAttempts) {
    // Generate a random 4x4 grid with values 1, 0, or -1
    const randomGrid = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 3) - 1),
    );

    const result = findMaxScore(randomGrid);
    if (result.maxScore >= minScore) {
      foundGrids.push({
        grid: randomGrid,
        maxScore: result.maxScore,
      });
    }
    attempts++;
  }
  return foundGrids;
}

// Example usage to find grids with a max score >= 14
/*
const grids = findGridsWithMaxScoreAbove(14, 10); // Find 3 grids with a max score >= 14

if (grids.length > 0) {
  console.log(
    `Found ${grids.length} grid(s) with a maximum score of 14 or more:`,
  );
  grids.forEach((item, index) => {
    console.log(`\nGrid ${index + 1}:`);
    console.log(`  Max Score: ${item.maxScore}`);
    console.log("  Initial State:");
    item.grid.forEach((row) => console.log(`    [${row.join(", ")}]`));
  });
} else {
  console.log(
    "Could not find any grids with a maximum score of 14 or more within the given attempts.",
  );
}
  */
