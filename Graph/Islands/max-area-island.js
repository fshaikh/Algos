/**
Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land)
connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid
are surrounded by water.

Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)

Example 1:

[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
Given the above grid, return 6. Note the answer is not 11, because the island must be connected 4-directionally.
Example 2:

[[0,0,0,0,0,0,0,0]]
Given the above grid, return 0.
Note: The length of each dimension in the given grid does not exceed 50.
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    if(grid.length === 0){
        return 0
    }
    const visited = new Set(),  rows = grid.length, columns = grid[0].length;
    let count = 0;
    let totalIslands = [];
    let max = 0;
    let island = [],islandCount = 0;
    for(let i=0;i<grid.length;i++){
        const array = grid[i];
        
        for(let j=0;j<array.length;j++){
            if(array[j] === 1 && !isVisited(i,j)){
                doDFS(array,i,j);
                if(islandCount > max){
                    max = islandCount;
                }
                islandCount = 0;
                // totalIslands.push(island.length);
                // if(island.length > max){
                //     max = island.length
                // }
                // island = [];
            }
        }
    }
    
    function doDFS(array,i,j){
        // get the 4 neighbours of the cell
        if(!isValidCell(array,i,j)){
            return;
        }
        islandCount++;
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
    // console.log(totalIslands)
    // console.log(count)

    
    return max;
};

console.log(numIslands([[0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]]))