/**
 * Given a 32-bit signed integer, reverse digits of an integer.

Example 1:

Input: 123
Output: 321
Example 2:

Input: -123
Output: -321
Example 3:

Input: 120
Output: 21
Note:
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
 */

const MAX_SAFE_INTEGER = Math.pow(2,31) - 1;
const MIN_SAFE_INTEGER = Math.pow(2,31)*-1;

function reverseNumber(x){
    let reverse = 0,quotient = x > 0 ? x : x*-1;
    
    while(quotient !== 0){
        if(reverse > MAX_SAFE_INTEGER || reverse < MIN_SAFE_INTEGER){
            return 0;
        }
        reverse = reverse*10 + quotient%10;
        quotient = Math.floor(quotient/10);
    }
    if(reverse > MAX_SAFE_INTEGER || reverse < MIN_SAFE_INTEGER){
        return 0;
    }
    return x > 0 ? reverse: reverse*-1;
}

//#region Naive Solution
 const Queue = require('../Queue/Queue').Queue;

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    if(x > MAX_SAFE_INTEGER || x < MIN_SAFE_INTEGER){
        return 0;
    }
    if(x < 10 && x > -10){
        return x;
    }
    // get the digits of the number in reverse order
    const reverseNumber = getReverseDigits(x > 0? x : x*-1);
    return x > 0 ? reverseNumber : reverseNumber*-1;
};

function getReverseDigits(x){
    const queue = new Queue();
    let quotient  = x,  remainder = 0,count = 0;
    while(quotient !== 0){
        remainder = quotient%10;
        quotient = Math.floor(quotient/10);
        queue.enqueue(remainder);
        count++;
    }
    let sum = 0;
    while(!queue.isEmpty()){
        count--;
        sum += queue.dequeue()*Math.pow(10,count);
        if(sum > MAX_SAFE_INTEGER){
            sum = 0;
            break;
        }

    }
    return sum;
}
//#endregion Naive Solution
console.log(Math.pow(2,31) - 1)
console.log(9646324351)
console.log((-123)%10)
console.log(reverseNumber(1534236469));

// Takeways:
//  Given a number, get its reverse using MOD approach
//  Given a string, convert to a number
//  Safest maximum value on the positive side for a number is 2^53 - 1. Any value after this is unsafe for number operations
// 

