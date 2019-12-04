/**
 * Given a non-empty array of digits representing a non-negative integer, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.

Example 1:

Input: [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Example 2:

Input: [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
 */

 /**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    if(digits.length === 0){
        return digits;
    }
    const length = digits.length;
    var sum = digits[length - 1] + 1;
    if(sum < 10){
        digits[length -1] = sum;
        return digits;
    }
    if(length === 1){
        return [1,0];
    }

    let carry = 1;
    sum = 0;
    digits[length - 1] = sum;
    for (let index = length - 2; index >= 0; index--) {
        const element = digits[index];
        sum += element + carry;
        if(sum < 10){
            digits[index] = sum;
            carry = 0;
            sum = 0;
            continue;
         }
         sum = 0;
         carry = 1;
         digits[index] = 0;
    }
    if(carry === 1){
        digits.unshift(1);
    }
    return digits;
};

// console.log(plusOne([])); // []
// console.log(plusOne([1])); // [2]
// console.log(plusOne([9])); // [1,0]
// console.log(plusOne([1,2,3])); // [1,2,4]
// console.log(plusOne([9,9,8])); // [9,9,9]
// console.log(plusOne([9,9,9])); // [1,0,0,0]
console.log(plusOne([2,4,9,3,9]));