/**
 * Given a string S, return the number of substrings of length K with no repeated
 * characters.
Example 1:

Input: S = "havefunonleetcode", K = 5
Output: 6
Explanation: 
There are 6 substrings they are : 'havef','avefu','vefun','efuno','etcod','tcode'.
Example 2:

Input: S = "home", K = 5
Output: 0
Explanation: 
Notice K can be larger than the length of S. In this case is not possible to find any substring.
 
Note:
1 <= S.length <= 10^4
All characters of S are lowercase English letters.
1 <= K <= 10^4

 * @param {*} S 
 * @param {*} K 
 */

/**
 * @param {string} S
 * @param {number} K
 * @return {number}
 * Technique:  Sliding Window
 */
var numKLenSubstrNoRepeats = function(S, K) {
    // test cases:
    // algo:
      //  maintain a hash table 
      // maintain 2 pointers : start, end
      // iterate S
      //   for each character, check if its in the HT. 
      // .     checkExceedK
      // .     if
      // .     check if hash table count > K
      // .     If not present in HT, add to HT
      // .     increment the 
      if(S == null || S.length < K){
        return 0;
    }
    const map = new Map();
    let result = 0;
    let start = 0, end = 0;
    while(end < S.length){
        if(map.has(S[end])){
            start = map.get(S[end]) - 1;
            map.clear();
        }else{
            map.set(S[end],end);
        }
        end++;  
        if(map.size >= K){
            // add current set to result
            result++;
          // empty the current set
            map.delete(S[start]);
            // increment start
            start++;
        }
        
    }
      
      
      return result;
  };
  