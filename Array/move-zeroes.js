/**
 * Given an array nums, write a function to move all 0's to the end of it while maintaining the
 * relative order of the non-zero elements.

Example:

Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
Note:

You must do this in-place without making a copy of the array.
Minimize the total number of operations.
 */

 /**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let previousNonZeroCount = 0;
    for(let i=0;i<nums.length;i++){
        if(nums[i] !== 0){
            nums[previousNonZeroCount] = nums[i];
            previousNonZeroCount++;
        }
    }
    for(let i=previousNonZeroCount;i<nums.length;i++){
        nums[i] = 0
    }
};

// Sub-optimal
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes_SubOptimal = function(nums) {
    const length = nums.length;
    let nonZeroesCount = nums.reduce((count,value) => {
        if(value !== 0){
            count = count + 1;
        }
        return count;
    },0);
    for(let i=0;i<nonZeroesCount;i++){
        nums.unshift(-1);
    }
    let start = nonZeroesCount -1, end = nums.length-1;
    while(start >= 0){
        if(nums[end] !== 0){
            nums[start--] = nums[end--];
        }else{
            end--;
        }
        
    }
    nums.fill(0,nonZeroesCount,length )
    nums.splice(length)
    console.log(nums)
};