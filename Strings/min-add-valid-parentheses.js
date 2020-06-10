/**
 Given a string S of '(' and ')' parentheses, we add the minimum number of parentheses ( '(' or ')', and in any positions ) so that the resulting parentheses string is valid.

Formally, a parentheses string is valid if and only if:

It is the empty string, or
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
Given a parentheses string, return the minimum number of parentheses we must add to make the resulting string valid.

 

Example 1:

Input: "())"
Output: 1
Example 2:

Input: "((("
Output: 3
Example 3:

Input: "()"
Output: 0
Example 4:

Input: "()))(("
Output: 4
 

Note:

S.length <= 1000
S only consists of '(' and ')' characters.
 */

// #region Approach 1 - Mirror of min-remove-parentheses
// When we encounter '(', push to stack
// When we encounter ')', pop from stack
//     If popped is not '(', this means we have an unbalanced pair. so we add 1 to count
// return count + stack.size (since if we encounter only (, those will never be popped from stack
// TC: O(N), SC: O(N))

/**
 * @param {string} S
 * @return {number}
 */
var minAddToMakeValid = function(S) {
    // iterate the string S  O(N)
    // if '(', push to stack
    // if ')', pop from stack
    //   if '(', continue
    //   if ')' or empty, add to count
    // return count + stack.size
    
    const stack = new Stack();
    let count = 0;
    for(let i=0;i<S.length;i++){
        const value = S[i];
        if(value === '('){
            stack.push(value);
        }else{
            const poppedValue = stack.pop();
            if(poppedValue !== '('){
                count++;
            }
        }
    }
    
    return count + stack.size();
};
// #endregion Approach 1 - Mirror of min-remove-parentheses

//#region Approach 2 - Without stack
// One key technique in parentheses is to understand concept of balance
// Balance = 0.
// When we encounter '(', we increment balance by 1
// When we encounter ')', we decrement balance by 1
// When the string is balanced, balance = 0
// When string is unbalanced, string is either +ve or -ve. It is +ve , when '(' > ')' and -ve when ')' > '('
// We use this insight to solve this problem

var minAddToMakeValid = function(S) {
    let balance = 0, count = 0;
    for(let i=0;i<S.length;i++){
        // If we encounter a '(', increment balance , else decrement it
        balance += S[i] === '(' ? 1 : -1;
        // Now balance is either 0, +ve or -ve
        // If 0 , we dont do anything
        // If +ve, it means we have more '(' than ')'. 
        // If -1, it means we have more ')' than '('
        // So everytime we encounter -1, we can add a '('. This will make the string balanced so far. Now since
        // it is balanced, we can increment balance or make balance = 0
        if(balance === -1){
            count++;
            balance= 0;
        }
    }
    
    return balance + count;
}
//#endregion Approach 2 - Without stack