/**
 Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.

The order of output does not matter.

Example 1:

Input:
s: "cbaebabacd" p: "abc"

Output:
[0, 6]

Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
Example 2:

Input:
s: "abab" p: "ab"

Output:
[0, 1, 2]

Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
 */

 // Approach 1 - Brute force 
 // Approach 2- Sliding window

 // Approach 1 - Brute Force
 /**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    // iterate s  - O(N)
    //    take p.length elements i.e s1   O(p)
    //    find if p and s1 are anagrams   O(N)
    //    if anagram, add index to results
    const startIndices = [];
    for(let i=0;i<s.length;i++){
        if((i + p.length) > s.length){
            break;
        }
        const s1 = s.slice(i,i + p.length);
        if(isAnagram(s1,p)){
            startIndices.push(i)
        }
    }
      
    return startIndices;
  };
  
  function isAnagram(s,t){
      const alphabetCount = [];
      for(let i=0;i<26;i++){
          alphabetCount[i] = 0;
      }
      
      for(let i=0;i<s.length;i++){
          alphabetCount[s[i].charCodeAt(0) - 97]++;
          alphabetCount[t[i].charCodeAt(0) - 97]--;
      }
      
      return !alphabetCount.some(i => i !== 0);
  }

 // Approach 2- Sliding window
 var findAnagrams2 = function(s,p) {
     const sAlphabetCount = [], pAlphabetCount = [], startIndices = [];
     for(let i=0;i<26;i++){
        sAlphabetCount[i] = 0;
    }
    for(let i=0;i<26;i++){
        pAlphabetCount[i] = 0;
    }

    for(let i=0;i<p.length;i++){
        pAlphabetCount[p[i].charCodeAt(0) - 97]++;
    }

    for(let i=0;i<s.length;i++){
        sAlphabetCount[s[i].charCodeAt(0) - 97]++;
        if(i >= p.length){
            const index = s[i - p.length].charCodeAt(0) - 97;
            sAlphabetCount[index]--;
        }
        if(sAlphabetCount.equals(pAlphabetCount)){
            startIndices.push(i-p.length + 1);
        }
    }

    return startIndices;
 }

 Array.prototype.equals = function(array2){
     for(let i=0;i<this.length;i++){
         if(this[i] !== array2[i]){
             return false;
         }
     }
     return true;
 }

 console.log(findAnagrams2('abab','ab'))