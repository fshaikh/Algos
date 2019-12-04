/**
 * Given two strings s and t , write a function to determine if t is an anagram of s.

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
const asciiMap = {
    'a': 97,
    'b': 98,
    'c': 99,
    'd':100,
    'e':101,
    'f':102,
    'g':103,
    'h':104,
    'i':105,
    'j':106,
    'k':107,
    'l':108,
    'm':109,
    'n':110,
    'o':111,
    'p':112,
    'q':113,
    'r':114,
    's':115,
    't':116,
    'u':117,
    'v':118,
    'w':119,
    'x':120,
    'y':121,
    'z':122
}




var isAnagram = function(s, t) {
    if(s.length !== t.length){
        return false;
    }
    const array = [];
    for (let index = 97; index < 120; index++) {
        array[index] = false;
    }
    for (let index = 0; index < s.length; index++) {
        // get number from a letter
        array[s.charCodeAt(index)] = true;
    }

    for (let index = 0; index < t.length; index++) {
        // get number from a letter
        if(!array[t.charCodeAt(index)]){
            return false;
        }
    }
    return true


};


console.log(isAnagram('aa','aa'))