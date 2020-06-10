/**
 Given a N x N matrix, in which each row and each column in sorted in ascending order, 
 return whether an element is present in the matrix

10 20 30 40 50
11 22 33 44 55
12 32 42 52 62
13 43 53 63 73
14 44 54 64 74

Example 1:
Search for element 22, returns true

Example 2:
Search for element 99, returns false

Constraint:
It is trivial to search in O(MN) time by scanning each row and column. Write algorithm to search in linear time

NOTE: Take advantage of the input where each row and column is sorted

If we start at top-left or bottom-right:
   Both elements to right and below are > , so we cannot make a decision where to go when a comparison is done
If we start at top-right:
   Element above/below is smaller/larger. For eg: 13 < 14 and 44 > 14
 */

function isElementExists(matrix, element){
    if(matrix.length === 0){
        return false;
    }
    const rows = matrix.length - 1, columns = matrix[0].length - 1;
    let i = 0, j = columns;
    while(isValidCell(i,j)){
        const cellValue = matrix[i][j];
        if(cellValue === element){
            return true;
        }
        if(cellValue > element){
            j--;
        }
        if(cellValue < element){
            i++;
        }
    }
    return false;
   
    function isValidCell(i,j){
        return (i >=0 && i <= rows) &&
               (j >=0 && j<= columns);
    }
}

const matrix = [
    [10, 20, 30, 40, 50],
    [11, 22, 33, 44, 55],
    [12, 32, 42, 52, 62],
    [13, 43, 53, 63, 73],
    [14, 44, 54, 64, 74]
]
console.log(isElementExists(matrix,14));


