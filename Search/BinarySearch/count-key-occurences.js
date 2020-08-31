/**
Given a sorted array, find the count of a given key. If no such key is present, return 0
Example:
array = [1,2,3,10,10,10,23,33], key = 10
Returns: 3

ALGO:
This problem relies on find-first-last-occurence. In this problem, we find the index of first occurence and last occurence
For eg: for key 10, it will return [4,6].
So to find count, we simply do 6 - 4 + 1 = 3
 */
const getFirstAndLastOccurences = require('./find-first-last-occurence').getFirstAndLastOccurences;

const EMPTY = [];
function getKeyCount(array,key){
    if(array == null || array.length === 0){
        return [];
    }
    const firstAndLastOccurenceIndices = getFirstAndLastOccurences(array, key);
    if(firstAndLastOccurenceIndices.length === 0){
        return 0;
    }
    return firstAndLastOccurenceIndices[1] - firstAndLastOccurenceIndices[0] + 1;
}

console.log(getKeyCount([1,2,3,10,10,10,23,33], 33))