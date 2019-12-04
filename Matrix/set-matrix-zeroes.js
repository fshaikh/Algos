/**
 * Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

Example 1:

Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
Example 2:

Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
 */

/**
* @param {number[][]} matrix
* @return {void} Do not return anything, modify matrix in-place instead.
*/
var setZeroes = function (matrix) {
    const arrayLength = matrix.length + matrix[0].length;
    const rowsCount = matrix.length;
    const array  = Array(arrayLength).fill(1);

    // Mark phase
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
        const row = matrix[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const element = row[columnIndex];
            if (element !== 0) {
                continue;
            }
            array[rowIndex] = 0;
            array[getColumnOffset(columnIndex,rowsCount)] = 0;
        }
    }
    
    // sweep phase
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        const row = matrix[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            if(array[rowIndex] === 0 || array[getColumnOffset(columnIndex,rowsCount)] == 0){
                row[columnIndex] = 0;
            }
        }
    }
};

function getColumnOffset(columnIndex,rowsCount){
    return (columnIndex + rowsCount);
}

const matrix = [
    [1,1,1],
  [1,0,1],
  [1,1,1]
];
setZeroes(matrix);
console.log(matrix);