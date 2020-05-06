/**
Given a sorted array A of unique numbers, find the K-th missing number starting from the
 leftmost number of the array.

 

Example 1:

Input: A = [4,7,9,10], K = 1
Output: 5
Explanation: 
The first missing number is 5.
Example 2:

Input: A = [4,7,9,10], K = 3
Output: 8
Explanation: 
The missing numbers are [5,6,8,...], hence the third missing number is 8.
Example 3:

Input: A = [1,2,4], K = 3
Output: 6
Explanation: 
The missing numbers are [3,5,6,7,...], hence the third missing number is 6.
 

Note:

1 <= A.length <= 50000
1 <= A[i] <= 1e7
1 <= K <= 1e8
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingElement = function(nums, k) {
    const missingIndex = [];
    for(let i=0;i<nums.length;i++){
        if(i === nums.length - 1){
            continue;
        }
        const diff = nums[i+1] - nums[i] -1;
        if(diff === 0){
            continue;
        }
        let val = nums[i];
        for(let i=0;i<diff;i++){
            missingIndex.push(++val);
        }
    }
    const length = missingIndex.length
    if(k <= length){
        return missingIndex[k-1];
    }
    const d = (k - length);
    let val = missingIndex[length - 1];
    const last = missingIndex[length - 1];;
    let index = 0;
    while(index < d){
        let v = ++val;
        if(v !== last){
            missingIndex.push(val);
        }
        index++;
    }
    console.log(missingIndex)
    return missingIndex[k-1];
};
console.log(missingElement([1,3,5,8],10));
// 2 4 6 7 9 10 11 12 13 14