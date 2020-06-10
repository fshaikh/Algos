/**
 Given a string s of '(' , ')' and lowercase English characters. 

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:

It is the empty string, contains only lowercase characters, or
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
 

Example 1:

Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
Example 2:

Input: s = "a)b(c)d"
Output: "ab(c)d"
Example 3:

Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.
Example 4:

Input: s = "(a(b(c)d)"
Output: "a(b(c)d)"
 */

 /**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    // for each value in s
    // if value is a letter, continue
    // if value is '(', push to stack index
    // if value is ')', pop. If pop is '(', do nothing, else add index to set
    // put all stack elements into set. These are indices of '('
    // go through the original string. Add only those element whose indices are not in set
    
    // return remove all elements from s from stack and array
    if(s === ""){
        return "";
    }
    const stack = new Stack();
    const set = new Set();
    for(let i=0;i<s.length;i++){
        if(s[i] === '('){
            stack.push(i);
        }else if(s[i] === ')'){
            const top = stack.peek();
            if(top == null){
                set.add(i);
            }else{
                stack.pop()
            }
        }
    }

    if(stack.length() === 0 && set.size === 0){
        return s;
    }
    while(!stack.isEmpty()){
        set.add(stack.pop())
    }
    let outputString = '';
    for(let i=0;i<s.length;i++){
        if(!set.has(i)){
            outputString += s[i]
        }
    }
    return outputString
};