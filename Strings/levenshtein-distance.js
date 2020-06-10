/**
 * Given 2 strings, compute edit distance between them
 * Edit distance is the number of operations required to transform string1 to string2
 * Allowed operations are:
 *  1. Insert one character
 *  2. Replace one character
 *  3. Delete one character
 *
 * Examples:
 * str1 = "abc", str2 = "abe"
 * Edit Distance  = 1.  Replace 'c' with 'e'
 *
 * str1 = "abcde" str2 = "abef"
 * Edit Distance = 3. Replace 'c' with 'e'. Replace 'd' with 'f'. Delete 'e'
 *
 * To understand the approach and solution, see Tushar Roy's excellent youtube video. It is based
 * on dynamic programming and tabulation.
 * TC: O(str1 + str2)
 * SC: O(str1*str2)
 
 Need to create a matrix of size M x N, where 
 M = rows = str2.length + 1
 N = columns = str1.length + 1
 Formula for cell is
 if(str1[j-1] === str2[i-1]) , matrix[i][j] = matrix[i-1][j-1]
 else take the minimum of (left, up and diagonal) 
    matrix[i][j] = min(m[i-1][j], m[i][j-1], m[i-1][j-1])

Edit distance = matrix[rows - 1][columns - 1];
 */

function computeEditDistance(str1, str2) {
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
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
        if(str1[j-1] === str2[i-1]){
            matrix[i][j] = matrix[i-1][j-1];
        }else{
            matrix[i][j] = Math.min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1
            
        }
        
    }
  }
  console.log(matrix);
  return matrix[rows-1][columns-1]
  //
}
console.log(computeEditDistance("a", ""));
