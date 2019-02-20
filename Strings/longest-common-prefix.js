/**
 * Given a array of N strings, find the longest common prefix among all
 *  strings present in the array.
 * Input:
    geeksforgeeks geeks geek geezer
    apple ape april
*  Output:
    gee
    ap
 */
const getLongestCommonPrefix = (array) => {
    let prefix = [];
    let firstWord = array[0];
    for(let j=0;j<firstWord.length;j++){
        for(let i=1;i<array.length;i++){
            if(firstWord[j] !== array[i][j]){
                return prefix.join('');
            }
            
        }
        prefix.push(firstWord[j])
    }
    return prefix.join('');
}

/**
 * Sort the array. Find the longest common prefix between first and last words
 * @param {*} array 
 */
const getLongestCommonPrefixUsingSorting = (array) => {
    array.sort();
    const first = array[0],
          last = array[array.length - 1];
    let prefix = '';
    for(let i=0;i<last.length;i++){
        if(first[i] !== last[i]){
            return prefix;
        }
        prefix += first[i]
    }
    return prefix;
};

console.log(getLongestCommonPrefixUsingSorting(['geeksforgeeks','geeks','geek','geezer']))