/**
 Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.
You may assume that the array is non-empty and the majority element always exist in the array.

Example 1:

Input: [3,2,3]
Output: 3
Example 2:

Input: [2,2,1,1,1,2,2]
Output: 2
 * Constraint:
 *   Time Complexity: O(N)
 *   Space Complexity: O(1)
 * 
 */

// #region Naive approach using O(N) time complexity and O(N) space complexity using map
var majorityElement = function(nums) {
    if(nums.length === 1){
        return nums[0]
    }
    const map = new Map();
    const majLength = Math.floor(nums.length/2);
    for(let i=0;i<nums.length;i++){
        const num = nums[i];
        if(!map.has(num)){
            map.set(num,1);
            continue;
        }
        let count = map.get(num);
        count +=1;
        if(count > majLength){
            return num;
        }
        map.set(num,count);
    };
    return 0;
};
// #endregion 

// #region Moore Vote algorithm
function majorityElementUsingMoore(nums){
    if(nums.length === 1){
        return nums[0];
    }
    // Pass 1:
    let majorityElement = nums[0];
    let count = 1;
    for (let index = 1; index < nums.length; index++) {
        const element = nums[index];
        if(element === majorityElement){
            count++;
        }else{
            count --;
        }
        if(count === 0){
            majorityElement = element;
            count++;
        }
    }
    // Pass 2:
    let refCount  = 0;
    let majCount = Math.floor(nums.length/2);
    for (let index = 0; index < nums.length; index++) {
        if(nums[index] === majorityElement){
            refCount++;
        }
    }
    if(refCount > majCount){
        return majorityElement
    }
    return -1;
}
//#endregion 

 /**
 * Given an unsorted list of integers N, find the majority element. A majority element is the one
 * which occurs > Floor(N/3 times).
 * For eg: [1,2,3,3,3] => 3 since it occurs > N/2 = 5/2 > 2 times
 * Constraint:
 *   Time Complexity: O(N)
 *   Space Complexity: O(1)
 * 
 */
// Variation of moore vote algorithm

/**
 * Check for Majority Element in a sorted array
Question: Write a C function to find if a given integer x appears more than n/2 times in a sorted array of n integers.
Basically, we need to write a function say isMajority() that takes an array (arr[] ), array’s size (n) and a number to be searched (x) as parameters and returns true if x is a majority element (present more than n/2 times).

Examples:

Input: arr[] = {1, 2, 3, 3, 3, 3, 10}, x = 3
Output: True (x appears more than n/2 times in the given array)

Input: arr[] = {1, 1, 2, 4, 4, 4, 6, 6}, x = 4
Output: False (x doesn't appear more than n/2 times in the given array)

Input: arr[] = {1, 1, 1, 2, 2}, x = 1
Output: True (x appears more than n/2 times in the given array)
 */

console.log(majorityElementUsingMoore([2,2,1,1,1,2,2]))