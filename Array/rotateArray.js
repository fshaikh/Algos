/**
Given an array, rotate the array to the right by k steps, where k is non-negative.

Follow up:

Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
Could you do it in-place with O(1) extra space?
 

Example 1:

Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
Example 2:

Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
 

Constraints:

1 <= nums.length <= 2 * 10^4
It's guaranteed that nums[i] fits in a 32 bit-signed integer.
k >= 0
 */

// Approaches:
// 1. Rotate array by one. Do this 'k' times    O(N2) O(1)
// 2. Use JS pop and unshift.                   O(N)  O(1)
// 3. Formula based                             O(N) O(N)

//#region Approach 1 - k-one
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    for(let i=0;i<k;i++){
        rotateRightByOne(nums);
    }
    function rotateRightByOne(nums){
        let prev = nums[0];
        for(let i=1;i<nums.length;i++){
            let temp = nums[i];
            nums[i] = prev;
            prev = temp;
        }
        nums[0] = prev;
    }
};


//#endregion Approach 1 - k-one

//#region JS Pop-unshift
function rotate(array, k){
    for(let i=0;i<k;i++){
        array.unshift(array.pop());
    }
}
// #endregion JS Pop-unshift

// #region Formula-based
function rotate(array,k){
    const newArray = []
    for(let i=0;i<array.length;i++){

    }
    return newArray;
}
// #endregion Formula-based

// function rotateArray(array,direction,steps){
//     if(direction === 0){
//         rotateLeft(array,steps);
//     }else{
//         rotateRight(array,steps);
//     }
// }

// function rotateRight(array,steps){
//     for(let i=0;i<steps;i++){
//         rotateOneStepToRight(array);
//     }
// }
// function rotateOneStepToRight(nums){
//     const length = nums.length;
//     for(let i = length - 1;i> 0;i--){
//         let temp = nums[i];
//         nums[i] = nums[i-1];
//         nums[i-1] = temp;
//     }
// }

//#region Formula-based
var rotate3 = function(nums, k) {
    const length  = nums.length;
    const a = []
    for(let i=0;i<length;i++){
        const newIndex = getNewIndex(i,k,length);
        console.log(newIndex)
        a[newIndex] = nums[i];
    }
    for(let i=0;i<length;i++){
        nums[i] = a[i]
    }
};

function getNewIndex(index,k,length){
    const offset = index + k%length;
    return offset < length ? offset : offset - length; 
}
//#endregion Formula-based



const array = [1,2,3,4];
rotate3(array,501);
console.log(array);

const date = Date.now();
console.log(new Date(date));
