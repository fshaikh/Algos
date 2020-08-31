/**
 Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note:

All inputs will be in lowercase.
The order of your output does not matter.

REV:
 */

 /**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    //create a map where key = sorted word, value = list of words which are anagrams of key
    // for eg: [eat, tea]
    // "aet": [eat, tea]
    const map = new Map();
    for(let i=0;i<strs.length;i++){
        const str = strs[i].split('').sort().join('');
        if(!map.has(str)){
            map.set(str,[strs[i]]);
        }else{
            map.get(str).push(strs[i])
        }
    }
    const results = []
    for(let [key,value] of map.entries()){
        results.push(value)
    }
    return results;
};

