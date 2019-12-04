/**
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?


Above is a 7 x 3 grid. How many possible unique paths are there?

Note: m and n will be at most 100.

Example 1:

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Right -> Down
2. Right -> Down -> Right
3. Down -> Right -> Right
Example 2:

Input: m = 7, n = 3
Output: 28
 */

 /**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let target= 0;
var uniquePaths = function(m, n) {
    // consider a directed graph
    // construct a directed graph as a 2d matrix
    const array = [];
    let index = 0;
    for(let i=0;i<n;i++){
        let subArray = [];
        for(let j=0;j<m;j++){
            subArray.push(index++);
        }
        array.push(subArray);
    }
    target = array[n-1][m-1];
    const map = new Map();
    // do dfs and increment the count when the target node is reached
    return doDFS(array,map);
    // return count;
};

function doDFS(array,map){
    return doDFSCore(0,0,array,map);
}

function doDFSCore(i,j,array,map){
    // if not a valid cell, return
    if(!isValidCell(i,j,array)){
        return 0;
    }
    const currentValue = array[i][j];
    // if exist in map then return the value
    if (map.has(currentValue)) {
        return map.get(currentValue);
    }
    
    if(array[i][j] === target){
        return 1;
    }    
    
    
    
    // get the neighbours of the node
    // right and down
    const total = doDFSCore(i,j+1,array,map) +
           doDFSCore(i+1,j,array,map); // right
    
    if (!map.has(currentValue)) {
        //const currentTotal = map.get(currentValue);
         // map.set(currentValue, currentTotal + total)
         map.set(currentValue, total)
    } 
    
    return total;
}

function isValidCell(i,j,array){
    if(i >= array.length || 
       j >= array[0].length  ){
        return false;
    }
    return true;
}