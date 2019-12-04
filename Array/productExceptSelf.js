/**
 * Given an array nums of n integers where n > 1,  return an array output such that
 *  output[i] is equal to the product of all the elements of nums except nums[i].

Example:

Input:  [1,2,3,4]
Output: [24,12,8,6]
Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity?
 (Output array does not count as extra space for the purpose of space complexity analysis.)
 */

var getProductExceptSelf = function(nums) {
    const left = [];
    const right = [];
    left[0] = 1;
    right[nums.length - 1] = 1;
    const product = [];

    // fill the left array which contains at left[i] = product of all elements to the left of i
    for (let index = 1; index < nums.length; index++) {
        left[index] = nums[index-1] * left[index-1]
    }

    // fill right array which contains at right[i] = product of all elements to right of i
    for (let index = nums.length -2; index >= 0; index--) {
        right[index] = nums[index+1] * right[index+1]
    }

    // take the product by multiplying left[i] * right[i]
    for (let index = 0; index < nums.length; index++) {
        product[index] = left[index]*right[index];
        
    }
    return product;
};
console.log(getProductExceptSelf([1,2,3,4]));