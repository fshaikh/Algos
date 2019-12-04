/**
 * Given two strings S and T, return if they are equal when both are typed
 * into empty text editors. # means a backspace character.

Example 1:

Input: S = "ab#c", T = "ad#c"
Output: true
Explanation: Both S and T become "ac".
Example 2:

Input: S = "ab##", T = "c#d#"
Output: true
Explanation: Both S and T become "".
Example 3:

Input: S = "a##c", T = "#a#c"
Output: true
Explanation: Both S and T become "c".
Example 4:

Input: S = "a#c", T = "b"
Output: false
Explanation: S becomes "c" while T becomes "b".
Note:

1 <= S.length <= 200
1 <= T.length <= 200
S and T only contain lowercase letters and '#' characters.
Follow up:

Can you solve it in O(N) time and O(1) space?
 */

const Stack = require('../../Stack/Stack').Stack;
const BACKSPACE_CHARACTER = '#';
const backspaceCompare = function(S, T) {
    // Algo:
    // initialize 2 stacks - one for S one for T.
    // For each character in S/T                            O(N)
    //   if character is not a #, push character to stack
    //   else, pop from stack
    // compare the 2 stacks. If same, return true, else false O(N)

    // TC: O(2N) = O(N)
    // SC: O(S + T) = O(N)

    const stack1 = new Stack();
    const stack2 = new Stack();
    iterateString(S,stack1);
    iterateString(T,stack2);
    return compareStacks(stack1,stack2);
};

const iterateString = function(str,stack){
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if(element === BACKSPACE_CHARACTER){
            stack.pop();
        }else{
            stack.push(element);
        }
    }
}

const compareStacks = function(stack1,stack2){
    if(stack1.length !== stack2.length){
        return false;
    }
    while(!stack1.isEmpty()){
        if(stack1.pop() !== stack2.pop()){
            return false;
        }
    }
    return true;
}

console.log(backspaceCompare("a#c","ac#"));