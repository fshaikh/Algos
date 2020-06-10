/**
 Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?
 */

 // Approach 1 - Sorting
 // Approach 2 - Maintaining count of each letter - ASCII
 // Approach 3 - Maintaining count of each letter - Generic 

 // Approach 1 - Sorting
 /**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length){
        return false;
    }
    const sortedS = getSorted(s);
    const sortedT = getSorted(t);
    console.log(sortedS, sortedT)
    let index = 0;
    while(index < s.length){
        if(sortedS[index] !== sortedT[index]){
            return false;
        }
        index++;
    }
    return true
};

function getSorted(s){
    const sorted = s.split('').sort();
    return sorted.join('')
}

// Approach 2 - Maintaining count of each letter - ASCII
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram2 = function(s, t) {
    if(s.length !== t.length){
        return false;
    }
    const alphabetCount = [];
    for(let i=0;i<26;i++){
        alphabetCount[i] = 0;
    }
    
    for(let i=0;i<s.length;i++){
        alphabetCount[s[i].charCodeAt(0) - 97]++;
        alphabetCount[t[i].charCodeAt(0) - 97]--;
    }
    
    return !alphabetCount.some(i => i !== 0);
};

// Approach 3 - Maintaining count of each letter - Generic 
var isAnagram3 = function(s,t){
    if(s.length !== t.length){
        return false;
    }
    const map = new Map();
    for(let i=0;i<s.length;i++){
        map.set(s[i], map.getOrDefault(s[i],0) + 1);
        map.set(t[i], map.getOrDefault(t[i],0) - 1);
    }
    // if there is any key which has a non-zero value, return false
    for (const iterator of map) {
        if (iterator[1] !== 0){
            return false;
        }
    }
    return true;
}

Map.prototype.getOrDefault = function(key,defaultValue){
    return this.has(key) ? this.get(key) : defaultValue;
}
console.log(isAnagram2('abcde','edacb'));