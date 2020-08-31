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
  var count = 0;
  // Array to store all the palindromic substrings
  valuesArray = [];

  // Handling odd-length palindromes
  // Start at the index and move backward and forward to compare. Keep moving the index till we reach the end
  count += findPalindromes(
    n,
    s,
    (i, j, n) => i + j < n && i - j >= 0,
    (i, j) => i + j,
    (i, j, s) => {
      if (j === 0) {
        valuesArray.push(s[i]);
      } else {
        valuesArray.push(s.substring(i - j, i + j + 1));
      }
    }
  );
  // Handling even-length palindromes
  count += findPalindromes(
    n,
    s,
    (i, j, n) => i + j + 1 < n && i - j >= 0,
    (i, j) => i + j + 1,
    (i, j, s) => valuesArray.push(s.substring(i - j, i + j + 2))
  );

  return {
    count: count,
    values: valuesArray,
  };
}

const findPalindromes = (n, s, loopConditionFunc, indexFunc, add) => {
  var count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; loopConditionFunc(i, j, n); j++) {
      if (s[indexFunc(i, j)] !== s[i - j]) {
        break;
      } else {
        add(i, j, s);
        count++;
      }
    }
  }
  return count;
};

const getLongestPalindrome = (s) => {
  const response = getCountofPalindromicSubstrings(s.length, s);
  var maxLength = 0;
  var longestPalindrome = "";
  response.values.forEach((item) => {
    if (item.length > maxLength) {
      maxLength = item.length;
      longestPalindrome = item;
    }
  });
  return longestPalindrome;
};
function reverse(s) {
  return s.split("").reverse().join("");
}
/**
 * Algorithm:
 *  1. Start from i=0, j=1 and check each substring (i,j),if its a palindrome
 *      For eg: abaab, start i=0, j=1, then compare a, ab, aba, abaa, abaab
 *                     i=1, j=2, then compare b,ba,baa,baab
 *                      and so on...
 * Time Complexity: O(N2)
 * Space Complexity: O(N)
 * NOTE: This returns all palindromic substrings. To return only distinct, add to set
 * @param {*} s 
 */
function getPalindromeSubstringCount(s) {
  let results = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      let temp = s.substring(i, j);
      if (temp.length >= 2) {
        let tempReverse = reverse(temp);
        if (temp === tempReverse) {
          results.push(temp);
        }
      }
    }
  }
  return results;
}

function getDistinctPalindromeSubstrings(s){
    const results = [], set = new Set();
    for(let i=0;i<s.length;i++){
        for(let j=i+1;j<=s.length;j++){
            const temp = s.substring(i,j);
            if(set.has(temp)){
                continue;
            }
            if(temp.length >= 2){
                const tempReverse = reverse(temp);
                if(temp === tempReverse){
                    results.push(temp);
                    set.add(temp)
                }
            }
        }
    }
    return results;
}
console.log(getPalindromeSubstringCount("ababa"));
console.log(getDistinctPalindromeSubstrings("ababa"));
// console.log(getCountofPalindromicSubstrings('rfkqyuqfjkxy').count)
