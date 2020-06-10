/**
 * Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally 
 * connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.
 */
let visitedCells = new Set();
let totalIslands = [];
const closedIsland = (matrix) => {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    const array = matrix[i];
    let island = [];
    for (let j = 0; j < array.length; j++) {
      if (
        array[j] === 0 &&
        !isVisited(i, j) &&
        !isOnEdge(matrix, i, j, array.length)
      ) {
        handleNeighbours(matrix, i, j, island);
        count++;

        totalIslands.push(island);
        island = [];
      }
    }
  }
  return count;
};

const handleNeighbours = (matrix, i, j, island) => {
  if (!isSafeCell(matrix, i, j)) {
    return;
  }
  island.push([i, j]);
  markVisited(i, j);
  handleNeighbours(matrix, i - 1, j, island);
  handleNeighbours(matrix, i, j + 1, island);
  handleNeighbours(matrix, i, j - 1, island);
  handleNeighbours(matrix, i + 1, j, island);
};

const getCell = (i, j) => `${i}${j}`;
const isVisited = (i, j) => visitedCells.has(getCell(i, j));
const markVisited = (i, j) => visitedCells.add(getCell(i, j));
const isSafeCell = (matrix, i, j) => {
  return (
    !isVisited(i, j) &&
    i >= 0 &&
    i < matrix.length &&
    j >= 0 &&
    j < matrix[i].length &&
    matrix[i][j] === 0
  );
};

function isOnEdge(grid, i, j, columns) {
  // if [i][j] is on corner , discard as it cannot be a closed island
  if (
    i - 1 < 0 ||
    i - 1 >= grid.length ||
    i + 1 >= grid.length ||
    j - 1 < 0 ||
    j + 1 >= columns
  ) {
    return true;
  }
  return false;
}

console.log(
  countIslands([
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
  ])
);
