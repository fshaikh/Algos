/**
 * Given a MxN matrix, rotate the matrix by 90 degrees
 * @param {*} matrix 
 */
const rotateMatrix = (matrix) => {
    let rotatedMatrix = initNewMatrix(matrix);
    for(let i=0;i<matrix.length;i++){
        const array = matrix[i];
        let newColumnIndex = array.length - 1 - i;
        let newRowIndex = 0;
        for(let j=0;j<array.length;j++){
            rotatedMatrix[newRowIndex][newColumnIndex] = matrix[i][j];
            newRowIndex++;
        }
    }
};

const initNewMatrix = (matrix) => {
    const length = matrix.length;
    let rotatedMatrix = [];
    for(let i=0;i<length;i++){
        rotatedMatrix[i] = Array(matrix[i].length).fill(0);
    }
    return rotatedMatrix;
}

rotateMatrix([[1,2,3],[4,5,6],[7,8,9]])