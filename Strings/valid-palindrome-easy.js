/**
 Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false

NOTE: The only tricky part is to read requirements carefully. String can contain any characters and only a-z, 0-9 are valid
      Ignore case
 * @param {*} s 
 */
var isPalindrome = function(s) {
    if(s == null || s === ''){
        return true;
    }
    let start = 0, end = s.length - 1;
    while(start < end){
        const startChar = s[start].toLowerCase(), endChar = s[end].toLowerCase();
        if(!isValidCharacter(startChar)){
            start++;
            continue;
        }
        if(!isValidCharacter(endChar)){
            end--;
            continue;
        }
        if(startChar !== endChar){
            return false;
        }
        start++;
        end--;
    }
    return true;
};
const validCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',0,1,2,3,4,5,6,7,8,9];
function isValidCharacter(c){
    // a-z, 0-9
    return validCharacters.includes(c);
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));