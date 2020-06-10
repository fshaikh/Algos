
/**
 Given two words word1 and word2, find the minimum number of steps required to make word1 and word2 the same,
where in each step you can delete one character in either string.

Example 1:
Input: "sea", "eat".  Output: 2

Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".

Note:
The length of given words won't exceed 500.
Characters in given words can only be lower-case letters.

ALGO: 
Similar to edit distance with slight modififcation. Build the same 2d array and determine the formula
 */
function getDeleteDistance(str1,str2){
    const columns = str1.length + 1,
    rows = str2.length + 1,
    matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < columns; j++) {

      if (i === 0) {
        matrix[i].push(j);
        continue;
      }
      if (j === 0) {
        matrix[i].push(i);
        continue;
      }
      matrix[i].push(0);
    }
  }

  for(let i=1;i<rows;i++){
      for(let j=1;j<columns;j++){
          if(str1[j-1] === str2[i-1]){
              matrix[i][j] = matrix[i-1][j-1];
          }else{
              matrix[i][j] = Math.min(matrix[i-1][j], matrix[i][j-1]) + 1
          }
      }
  }
  return matrix[rows-1][columns-1]
}
console.log(getDeleteDistance('boat','goat'));