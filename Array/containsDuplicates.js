function containsDuplicate(array){
    const set = new Set();
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(set.has(element)){
            return true;
        }
        set.add(element);
    }

    return false;
}

console.log(containsDuplicate([1,2,3,1]));
console.log(containsDuplicate([1,2,3,4]));
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]));

/**
 * Given an array of integers A sorted in non-decreasing order,
 *  return an array of the squares of each number, also in
 *  sorted non-decreasing order.

 

Example 1:

Input: [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Example 2:

Input: [-7,-3,2,3,11]
Output: [4,9,9,49,121]
 

Note:

1 <= A.length <= 10000
-10000 <= A[i] <= 10000
A is sorted in non-decreasing order.
 */