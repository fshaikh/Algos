/**
 * Given an array C of size N-1 and given that there are numbers from 1 to N
 * with one element missing, the missing number is to be found.
 * @param {*} array 
 * @param {*} n
 * Example:
Input:
2
5
1 2 3 5
10
1 2 3 4 5 6 7 8 10

Output:
4
9 
 */
const findMissingNumber = (array, n) => {
    let missingNumber = 0;
    const sum = (n*(n+1))/2;
    const actualSum = array.reduce((s,value)=> s+value,0);
    return sum - actualSum;
}

console.log(findMissingNumber([1,2,3,4,5,6,7,9,10],10))