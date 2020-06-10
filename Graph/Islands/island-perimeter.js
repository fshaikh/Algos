/**
 You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water,
 and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes" (water inside that isn't connected to the water around the island).
One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100.
 
Determine the perimeter of the island.

 

Example:

Input:
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]

Output: 16

Explanation: The perimeter is the 16 yellow stripes in the image below:

https://leetcode.com/problems/island-perimeter/
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  if (grid.length === 0) {
    return 0;
  }
  const visited = new Set(),
    rows = grid.length,
    columns = grid[0].length;
  let perimeter = 0;
  for (let i = 0; i < grid.length; i++) {
    let array = grid[i];
    for (let j = 0; j < array.length; j++) {
      if (array[j] === 1 && !isVisited(i, j)) {
        walkIslandCell(i, j);
      }
    }
  }

  function walkIslandCell(i, j) {
    if (!isValidCell(i, j)) {
      return;
    }
    // check the surrounding cells in horizontal and vertical direction. If 0 or outside bound, increment perimiter
    if (i - 1 < 0 ) {
      perimeter++;
    }
    if(i + 1 >= rows) {
        perimeter++;
    }
    if(j - 1 < 0){
        perimeter++;
    }
    if(j + 1 >= columns){
        perimeter++;
    }
    if( i - 1 >=0 && grid[i - 1][j] === 0){
        perimeter++;
    }
    if( i + 1 < rows && grid[i + 1][j] === 0){
        perimeter++;
    }
    if( j - 1 >=0 && grid[i][j - 1] === 0){
        perimeter++;
    }
    if( j + 1 <columns && grid[i][j + 1] === 0){
        perimeter++;
    }
    // up, down, left, right

    markVisited(i, j);
    // visit neighbouring island cells
    walkIslandCell(i - 1, j); // up
    walkIslandCell(i + 1, j); // down
    walkIslandCell(i, j - 1); // left
    walkIslandCell(i, j + 1); // right
  }
  function getKey(i, j) {
    return `${i}:${j}`;
  }
  function isVisited(i, j) {
    return visited.has(getKey(i, j));
  }

  function markVisited(i, j) {
    visited.add(getKey(i, j));
  }

  function isValidCell(i, j) {
    return (
      i >= 0 &&
      i < rows &&
      j >= 0 &&
      j < columns &&
      !isVisited(i, j) &&
      grid[i][j] === 1
    );
  }

  return perimeter;
};

console.log(
  islandPerimeter([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
  ])
);
