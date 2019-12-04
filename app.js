// /**
//  * @param {string} A
//  * @param {string} B
//  * @return {boolean}
//  */
// var rotateString = function(A, B) {
//     if(A === B){
//         return true;
//     }
//     const length = A.length;
//     let index = 0;
//     let array = Array.from(A);
//     while(index < length){
//         array = Array.from(array).slice(1).concat(array[0]);
//         if(array.join('') === B){
//             return true;
//         }
//         index++;
//     }
//     return false;
// };

// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

// Note: The algorithm should run in linear time and in O(1) space.

// Example 1:

// Input: [3,2,3]
// Output: [3]
// Example 2:

// Input: [1,1,1,3,3,2,2,2]
// Output: [1,2]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
  const map = new Map();
  const majorityCount = Math.floor(nums.length/3);
  let majorityElements = [];
  for (let index = 0; index < nums.length; index++) {
      let count = map.get(nums[index]) || 0;
      map.set(nums[index],++count);
  }  
  console.log(map);
  for(const [key,value] of map.entries()){
      if(value > majorityCount){
        majorityElements.push(key)
      }
  }
  return majorityElements;
};

console.log(majorityElement([1,1,1,3,3,2,2,2]));