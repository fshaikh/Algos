// The King's March
// You’re given a chess board with dimension n x n. There’s a king at the bottom right
// square of the board marked with s. The king needs to reach the top left square
// marked with e. The rest of the squares are labeled either with a number p
// (marking a point) or with x marking an obstacle. Note that the king can move up,
// left and up-left (diagonal) only.
// Find the maximum points the king can collect and 
// the number of such paths the king can take in order to do so.

const paths = [];
let visitedCells = new Set();
const kingsMarch = (matrix) => {
    const length = matrix.length;
    // kings index will always be matrix[length - 1][length - 1]
    // destination will always be matrix[0][0]
    for(let i=length-1;i>=0;i--){
        for(let j=length-1;j>=0; j--){
            travsersePath(matrix,i,i);
        }
    }

};

const traversePath = (matrix,i,j) => {
    if(isReached(matrix,i,j)){
        return;
    }
    if(!isValidCell(matrix,i,j)){
        return;
    }
    // travserse the valid neighbours
    traversePath(matrix,i-1,j);
    traversePath(matrix,i,j-1);
    traversePath(matrix,i-1,j-1);
    paths.push(matrix[i][j]);
};

const isReached = (matrix,i,j)=> matrix[i][j] === 'e';

const getCell = (i, j) => `${i}${j}`;
const isVisited = (i, j) => visitedCells.has(getCell(i, j));
const markVisited = (i, j) => visitedCells.add(getCell(i, j));

const isValidCell = (matrix,i,j) => {
    return (
            (i >= 0 && i < matrix.length) &&
            (j >= 0 && j < matrix.length) &&
            !isVisited(i,j) &&
            matrix[i][j] !== 'x'
          );

};

const ts1 = [
  ['e', 2,  3],
  [2,  'x', 2],
  [1 , 2,  's']
];
// #region Test cases
// Sample Input
// 3
// 3
// e 2 3
// 2 x 2
// 1 2 s
// 3
// e 1 2
// 1 x 1
// 2 1 s
// 3
// e 1 1
// x x x
// 1 1 s
// Sample Output
// 7 1
// 4 2
// 0 0

// Sample Inputs - 
// 25
// 2
// e 1
// 1 s
// 2
// e x
// x s
// 3
// e x x
// x x x
// x x s
// 3
// e 1 1
// 1 1 1
// 1 1 s
// 4
// e 1 1 1
// 1 1 1 1
// 1 1 1 1
// 1 1 1 s
// 4
// e 1 1 1
// 1 x 1 1
// 1 1 x 1
// 1 1 1 s
// 5
// e 1 1 1 1
// 1 1 1 1 1
// 1 1 1 1 1
// 1 1 1 1 1
// 1 1 1 1 s
// 5
// e 1 1 1 x
// 1 x x x 1
// 1 x 9 x 1
// 1 x x x 1
// x 1 1 1 s
// 3
// e 2 3
// 2 x 2
// 1 2 s
// 3
// e 2 1
// 2 x 2
// 1 2 s
// 3
// e 2 x
// 2 x 2
// x 2 s
// 3
// e 1 x
// 4 x x
// x 1 s
// 3
// e 1 1
// 1 x 1
// 1 1 s
// 3
// e 1 1
// x x x
// 1 1 s
// 6
// e 9 6 1 5 5
// 2 4 9 3 x 1
// 6 2 8 x 4 5
// 7 9 7 1 1 1
// 2 3 5 4 4 4
// 4 4 3 9 8 s
// 9
// e 4 x 9 1 7 5 9 1
// 2 9 8 2 9 6 x 8 8
// 9 5 9 5 7 1 x 2 1
// 2 3 8 9 x 3 8 7 8
// 8 8 9 2 x 2 7 8 2
// 4 6 2 6 8 7 9 5 9
// x 6 3 8 8 3 5 8 7
// 9 5 7 3 5 8 4 8 1
// x 4 4 5 8 7 4 1 s
// 7
// e 2 8 7 6 7 4
// 2 6 6 2 x 6 7
// 3 1 1 4 x 7 2
// 1 4 2 6 1 7 6
// x 7 8 9 x 4 x
// 7 1 1 4 x 2 4
// 8 6 5 9 1 1 s
// 7
// e 5 4 9 9 3 7
// x 3 1 4 5 7 5
// 3 6 3 x 6 x 5
// 7 1 5 8 x 9 1
// 8 4 3 9 6 8 3
// 2 x x 5 9 3 7
// 3 2 6 4 7 4 s
// 3
// e 6 1
// 4 8 9
// 9 9 s
// 10
// e x 6 2 x 3 5 9 8 4
// 3 3 5 7 4 2 8 8 4 8
// 4 2 5 8 8 5 5 x 7 2
// 1 5 3 2 1 9 3 4 6 9
// x x 7 1 4 3 8 3 x 1
// x 8 8 8 8 1 4 9 5 9
// 7 6 9 2 2 6 1 4 7 4
// 7 9 8 2 1 4 9 8 4 x
// 8 6 2 3 1 6 3 3 3 5
// 2 5 7 7 9 2 4 6 3 s
// 7
// e 5 7 6 1 6 2
// 1 7 8 6 3 9 1
// 9 5 6 8 9 7 x
// 8 5 8 5 8 7 8
// 1 4 4 6 4 1 5
// 8 9 6 1 5 x 8
// 9 9 5 2 8 8 s
// 10
// e 6 4 9 x x 6 x 1 x
// 4 8 6 x 2 8 x 6 5 6
// 3 4 1 9 7 4 5 6 1 2
// x 4 3 x 9 9 1 1 6 4
// 9 5 3 x 8 4 5 3 x 3
// x x x x 8 1 6 8 x x
// 5 4 9 x x x x 5 2 x
// 1 6 6 2 x 2 1 x 6 2
// 5 3 x 8 9 x x 2 2 1
// 2 3 6 1 7 8 7 3 1 s
// 6
// e x 9 3 8 3
// 5 x 3 9 9 x
// 9 7 3 8 6 1
// x 3 8 6 2 6
// 8 3 5 1 1 x
// 5 x 9 6 x s
// 7
// e x 8 6 4 3 x
// x x 3 8 2 6 8
// 2 6 x 5 5 8 4
// 4 4 4 2 7 9 x
// x 7 8 3 x 6 3
// 4 3 6 6 x 1 7
// 1 x 8 2 9 5 s
// 4
// e 2 2 2
// 1 x x 2
// 1 x x 1
// 1 1 2 s

// Sample Outputs
// 1 2
// 0 1
// 0 0
// 3 6
// 5 20
// 5 4
// 7 70
// 6 2
// 7 1
// 5 2
// 4 2
// 5 1
// 3 2
// 0 0
// 65 1
// 101 15
// 60 1
// 65 3
// 23 2
// 96 6
// 79 4
// 94 3
// 41 4
// 0 0
// 9 1
// #endregion Test Cases
