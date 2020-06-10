/**
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands.
 An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
  You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input:
11110
11010
11000
00000

Output: 1
Example 2:

Input:
11000
11000
00100
00011

Output: 3
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if(grid.length === 0){
        return 0
    }
    const visited = new Set(),  rows = grid.length, columns = grid[0].length;
    let count = 0;
    let totalIslands = [];
    for(let i=0;i<grid.length;i++){
        const array = grid[i];
        let island = [];
        for(let j=0;j<array.length;j++){
            if(array[j] === 1 && !isVisited(i,j)){
                doDFS(array,i,j,island);
                ++count;
                totalIslands.push(island);
                island = [];
            }
        }
    }
    
    function doDFS(array,i,j,island){
        // get the 4 neighbours of the cell
        if(!isValidCell(array,i,j)){
            return;
        }
        island.push(i,j);
        // call DFS on each cell
        visited.add(getCellKey(i,j));
        // left
        doDFS(array,i,j-1,island);
        // right
        doDFS(array,i,j+1,island);
        // up
        doDFS(array,i-1,j,island);
        // down
        doDFS(array,i+1,j,island);
    }
        
    function isValidCell(array, i,j){
            // for a cell to be valid:
            // unvisited
            // value = 1
            // i < array.length
            // j < array[i].length
        const isValid =  !isVisited(i,j) &&
               (i >= 0 && i < rows) &&
               (j >= 0 && j < columns) &&
               grid[i][j] === 1;
        return isValid;
            
    }
        
    function getCellKey(i,j){
        return `${i}:${j}`;
    }

    function isVisited(i,j){
        return visited.has(getCellKey(i,j));
    }
    console.log(totalIslands)
    return count;
};

console.log(numIslands([[0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]]))