/*
In a given 2D binary array A, there are two islands.
  (An island is a 4-directionally connected group of 1s not connected to any other 1s.)

Now, we may change 0s to 1s so as to connect the two islands together to form 1 island.

Return the smallest number of 0s that must be flipped.  (It is guaranteed that the answer is at least 1.)

 

Example 1:

Input: A = [[0,1],[1,0]]
Output: 1
Example 2:

Input: A = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
Example 3:

Input: A = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1
 

Constraints:

2 <= A.length == A[0].length <= 100
A[i][j] == 0 or A[i][j] == 1

Sources:
https://leetcode.com/problems/shortest-bridge/
https://leetcode.com/problems/shortest-bridge/discuss/189293/C%2B%2B-BFS-Island-Expansion-%2B-UF-Bonus
 */

 /**
 * @param {number[][]} A
 * @return {number}
 */
var shortestBridge = function(A) {
    const rows = A.length,
          columns = A[0].length,
          visited = new Set();
    let found = false,
        distance = 2;
    
    markIsland();
    return minFlips();
    
    
    function markIsland(){
        for(let i=0;i<rows;i++){
          if(found) break;
          for(let j=0;j<columns;j++){
            if(A[i][j] === 1 && !isVisited(i,j)){
                markFirstIsland(i,j);
                found = true;
                break;
            }
         }
       }
    }
    function minFlips(){
        while(true){
            for (let i = 0; i < rows; ++i){
                for (let j = 0; j < rows; ++j) {
                    if(isTouchingIsland(i,j)){
                        return distance - 2;
                    }
                    
                        
                }
            }
            distance++;
        }
    }
    function expand(i,  j) {
      if (i < 0 || j < 0 || i > A.length -1 || j > A.length - 1) return false;
      if (A[i][j] == 0) A[i][j] = distance + 1;
      return A[i][j] == 1;
    } 
    
    
    
    function isTouchingIsland(i,j){
        return (A[i][j] === distance) &&
               ((expand(i - 1, j) ||
                 expand(i, j - 1) || 
                 expand(i + 1, j) ||
                 expand(i, j + 1)));
    }
    
    function markFirstIsland(i,j){
        if(!isValid(i,j)){
            return;
        }
        A[i][j] = 2;
        markVisited(i,j);
        
        markFirstIsland(i-1,j)
        markFirstIsland(i+1,j)
        markFirstIsland(i,j-1)
        markFirstIsland(i,j+1)
    }
    
    function getCellKey(i,j){
        return `${i}:${j}`;
    }
    
    function isVisited(i,j){
        return visited.has(getCellKey(i,j));
    }
    
    function markVisited(i,j){
        visited.add(getCellKey(i,j));
    }
    
    function isValid(i,j){
        return !isVisited(i,j) &&
               (i >=0 && i < rows) &&
               (j >=0 && j < columns) &&
               A[i][j] === 1
    }
};

    
    
    