const getNoOfIslands = function (matrix) {
    const length = matrix.length;
    let countOfIslands = 0;
    const visited = new Set();

    for (let i = 0; i < length; i++) {
        const array = matrix[i];
        for (let j = 0; j < array.length; j++) {
            const element = array[j];
            if (element === 1 && !visited.has(getKey(i,j))) {
                doDFS(visited, i, j, array, matrix);
                countOfIslands++;
            }
        }
    }

    return countOfIslands;
};

function doDFS(visited, i, j, array, matrix) {
    if (!isValidCell(i, j, visited, array, matrix)) {
        return;
    }
    // pre-visit
    visited.add(getKey(i, j));
    // visit
    doDFS(visited, i, j + 1, array,matrix);
    doDFS(visited, i, j - 1, array,matrix);
    doDFS(visited, i + 1, j, array,matrix);
    doDFS(visited, i - 1, j, array,matrix);
    // post-visit
}

function isValidCell(i, j, visited, array, matrix) {

    // not visited
    // not 1
    // bounds
    return !(i < 0 || j < 0) &&
        !(i > matrix.length - 1 || j > array.length) &&
        !visited.has(getKey(i, j)) &&
        matrix[i][j] === 1;

}

function getKey(i, j) {
    return `${i}:${j}`;
}
console.log(getNoOfIslands([
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0]
])); /// 1

