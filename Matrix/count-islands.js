let visitedCells = new Set();
const countIslands = (matrix) => {
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
        const array = matrix[i];
        for (let j = 0; j < array.length; j++) {
            if (array[j] === 1 && !isVisited(i, j)) {
                handleNeighbours(matrix, i, j);
                count++;
            }
        }
    }
    return count;
};

const handleNeighbours = (matrix, i, j) => {
    if (!isSafeCell(matrix, i, j)) {
        return;
    }
    markVisited(i, j);
    handleNeighbours(matrix, i - 1, j)
    handleNeighbours(matrix, i, j + 1)
    handleNeighbours(matrix, i, j - 1)
    handleNeighbours(matrix, i + 1, j)
}

const getCell = (i, j) => `${i}${j}`;
const isVisited = (i, j) => visitedCells.has(getCell(i, j));
const markVisited = (i, j) => visitedCells.add(getCell(i, j));
const isSafeCell = (matrix, i, j) => {
    return !isVisited(i, j) &&
           ( i >= 0 && i < matrix.length ) &&
           ( j >= 0 && j < matrix[i].length) &&
            matrix[i][j] === 1;

}

console.log(countIslands([[0,1,1],[1,0,0],[1,0,1]]));