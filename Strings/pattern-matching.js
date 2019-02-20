/**
 * 
 * @param {*} input 
 * @param {*} target 
 * 
 * Complexity: O(MN) where M = length of input string and N = length of target string
 */
const patternMatching = (input, target) => {
    if(target.length > input.length){
        return -1;
    }
    let j = 0;
    // find how many times first character occurs
    for(let i=0;i<input.length;i++){
        if(input[i] === target[j]){
            if(checkSubstring(input,i, target)){
                return i;
            }
        }
    }
    return false;
}

const checkSubstring = (input,i,target) => {
    for(let j=0;j<target.length;j++){
        if(target[j] != input[i]){
            return false;
        }
        i++;
    }
    return true;
}

console.log(patternMatching('abcbcglx','bcgl'))