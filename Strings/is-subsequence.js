/**
 Given a string s and a string t, check if s is subsequence of t.

A subsequence of a string is a new string which is formed from the original string by deleting
some (can be none) of the characters without disturbing the relative positions of the remaining characters. 
(ie, "ace" is a subsequence of "abcde" while "aec" is not).
 */

 /**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    if(s.length === 0){
        return true;
    }
    if(t.length == 0 || s.length > t.length){
        return false;
    }
    let sIndex = 0, tIndex = 0;
    while(sIndex < s.length && tIndex < t.length){
        if(s[sIndex] === t[tIndex]){
            sIndex++;
           
        }
         tIndex++
    }
    return sIndex === s.length
};