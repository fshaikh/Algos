/**
 Given an unsorted array nums, reorder it in-place such that nums[0] <= nums[1] >= nums[2] <= nums[3]....

Example:

Input: nums = [3,5,2,1,6,4]
Output: One possible answer is [3,5,1,6,2,4]
 */
// #region Approach 1 - Naive
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function(nums) {
    if(nums.length == 0){
        return nums
    }
    nums.sort((a,b) => a - b);
    const results = [];
    let mid = Math.floor(nums.length / 2),  smallerIndex = 0, biggerIndex = mid + 1,index = 0;
    if(mid !== nums.length - 1){
        results[index++] = nums[mid];
    }
    
    while(biggerIndex < nums.length || smallerIndex < mid){
        if(biggerIndex < nums.length){
            results[index++] = nums[biggerIndex++];
        }
        if(smallerIndex < mid){
            results[index++] = nums[smallerIndex++];
        }
        
    }
    for(let i=0;i<results.length;i++){
        nums[i] = results[i]
    }
};
// #endregion Approach 1

//#endregion Approach 2 -
// Instead of sorting, just observe the array and the wiggle sorted array. The property of wiggle sorted array is:
// a[i] <= a[i+1] >= a[i+2] <= a[i+3] ....
// For eg: [11,2,3,4,5,6]
// At index 0, 2 ,4 ... a[i] <= a[i+1]. So at even index and the property is not true, swap i and i + 1
// At index 1,3,5,7,.... a[i] >= a[i+1]. So at odd index and property is not true, swap i and i + 1
// Key is the observation of the wiggle sort
// TC: O(N), SC: O(1)
var wiggleSort = function(nums) {
    for(let i=0;i<nums.length -1 ;i++){
        if((i%2 === 0 && nums[i] > nums[i+1]) ||
           (i%2 !== 0 && nums[i] < nums[i+1])){
            const temp = nums[i+1];
            nums[i+1] = nums[i];
            nums[i] = temp;
        }
    }
};
//#endregion Approach 2