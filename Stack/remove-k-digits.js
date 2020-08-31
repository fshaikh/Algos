/**
Given a non-negative integer num represented as a string, remove k digits from the number so that the new number is the smallest possible.

Note:
The length of num is less than 10002 and will be ≥ k.
The given num does not contain any leading zero.
Example 1:

Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
Example 2:

Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
Example 3:

Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

REV:

ALGO:
Start with brute force and k = 1. One way is to remove each digit and see the min number.
Another way is to check if a digit  < left-digit. Then we know we can remove the left digit.
For eg: 2134, k = 1.  1 < 2. So we can remove 2,to get 134.
Now how do we compare the left digit. We use stack

Corner cases to consider:
Monotinically increasing sequence. In this case no digits will be deleted. So we must remove k digits from stack
Leading zeroes should be removed when constructing the string from stack
If modified string is empty, return 0
 */

 /**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    const stack = [];
    let smallestNum = '';
    for(let i=0;i<num.length;i++){
        const numValue = num[i];
        while(!isEmpty() && numValue < peek() && k > 0 ){
            stack.pop();
            k = k-1;
        }
        stack.push(numValue);
    }
    // For monotonically increasing sequence, we will not have removed any 
    // digit. For eg: 1234
    for(let i=0;i<k;i++){
        stack.pop();
    }
    // Construct the string, but remove leading zero
    let isLeadingZero = true;
    for(let i= 0;i<stack.length;i++){
        if(stack[i] === '0' && isLeadingZero){
            continue
        }
        isLeadingZero = false;
        smallestNum += stack[i]
    }
    return smallestNum.length === 0 ? '0' : smallestNum
    
    function peek(){
        return stack[stack.length - 1];
    }
    
    function isEmpty(){
        return stack.length === 0;
    }
};