/**
 * Function to return the count of all palindromic substrings of a given string
 * @param {*} n - Length of the input string
 * @param {*} s - Input string
 * 
 * Complexity: O(N2)
 * Logic:
 * Variations:
 *      1. Get all the palindromic substrings
 *      2. Get all distinct palindromic substrings
 *      3. Get all special palindromic substrings
 *              A string is said to be a special palindromic string if either of two conditions is met:
                    All of the characters are the same, e.g. aaa.
                    All characters except the middle one are the same, e.g. aadaa.
 */
function getCountofPalindromicSubstrings(n, s) {
    // Variable to hold the count
    var count = 0
    // Array to store all the palindromic substrings
    valuesArray = [];

    // Handling odd-length palindromes
    // Start at the index and move backward and forward to compare. Keep moving the index till we reach the end
     count += findPalindromes(n, s, (i, j, n) => i + j < n && i - j >= 0, (i, j) => i + j, (i,j,s) => {
        if(j === 0){
            valuesArray.push(s[i]);
        }else{
            valuesArray.push(s.substring(i-j,i+j+1));
        }
     });
     // Handling even-length palindromes
     count += findPalindromes(n, s, (i, j, n) => i + j + 1 < n && i - j >= 0, (i, j) => i + j + 1, (i,j,s) => valuesArray.push(s.substring(i-j,i+j+2)));

    return {
        count: count,
        values: valuesArray
    };
}


const findPalindromes = (n, s, loopConditionFunc, indexFunc, add) => {
    var count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; (loopConditionFunc(i, j, n)); j++) {
            if (s[indexFunc(i, j)] !== s[i - j]) {
                break;
            } else {
                add(i,j,s);
                count++;
            }
        }
    }
    return count;
};

const getLongestPalindrome = (s) => {
    const response = (getCountofPalindromicSubstrings(s.length, s));
    var maxLength = 0;
    var longestPalindrome = '';
    response.values.forEach((item)=>{
        if(item.length > maxLength){
            maxLength = item.length;
            longestPalindrome = item;
        }
    });
    return longestPalindrome;
}

console.log(getLongestPalindrome('abac'))
