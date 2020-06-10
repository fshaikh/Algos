/**
A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given a non-empty string containing only digits, determine the total number of ways to decode it.

Example 1:

Input: "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
 */

var numDecodings = function(s) {
    if(s === null || s === ''){
        return 0;
    }
    const memoMap = new Map();
    return decodeWays(0,s);
    function decodeWays(index,s){
        // base condition
        if(index === s.length){
            return 1;
        }
        if(s[index] === '0'){
            return 0;
        }
        
        if(index === s.length - 1){
            return 1;
        }
        if(memoMap.has(index)){
            return memoMap.get(index);
        }
        // pick 1 and 2 from the string
        let count = decodeWays(index + 1, s);
        if(isValidCode(+s.substring(index, index+2))){
            count += decodeWays(index + 2, s);
        }
        memoMap.set(index,count)
        return count;
    }
};

function isValidCode(code){
    return code >=1 && code <= 26;
}