/**
 Given a string containing digits from 2-9 inclusive, return all possible letter combinations
  that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below.
 Note that 1 does not map to any letters.

 Example:

Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
Note:

Although the above answer is in lexicographical order, your answer could be in any order you want.

REV:

ALGO: 
Do a DFS starting from index 0 
 */

 /**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if(digits === ''){
        return []
    }
    let results = [], tempResults = [];
    const map = {
        0: '',
        1: '',
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8:'tuv',
        9: 'wxyz'
    }
    doLetterCombinations(0);
    return results;
    function doLetterCombinations(index){
        // base condition
        if(index === digits.length){
            results.push(tempResults.join(''));
            return;
        }
        const combination = map[digits[index]];
        for(let i=0;i<combination.length;i++){
            tempResults.push(combination[i]);
            doLetterCombinations(index+1);
            tempResults.pop();
        }
    }
    
    return results;
};