/**
 * Given two strings ‘X’ and ‘Y’, find the length of the longest common substring.
 * Input : X = "GeeksforGeeks", y = "GeeksQuiz"
   Output : 5
The longest common substring is "Geeks"

Input : X = "abcdxyz", y = "xyzabcd"
Output : 4
The longest common substring is "abcd" and is of
length 4.

Input : X = "zxabcdezy", y = "yzabcdezx"
Output : 6
The longest common substring is "abcdez" and is of
length 6.
 * 
 * https://www.youtube.com/watch?v=BysNXJHzCEs 
 */
const getSubStrings = (s) => {
    var subStrings = [];
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            subStrings.push(s.substring(i, j))
        }
    }
    return subStrings;
}

const getLongestCommonSubstring = (str1, str2) => {
    // get all substrings for str1
    const subStrings = getSubStrings(str1);
    let maxLength = 0;
    let longestSubstring = '';
    // for each substring
    subStrings.forEach((subString) => {
        if (str2.includes(subString)) {
            if (subString.length > maxLength) {
                maxLength = subString.length;
                longestSubstring = subString
            }
        }
    });
    return longestSubstring;
}

const getLongestCommonSubstringUsingDP = (str1, str2) => {
    // build the matrix

    let matrix = [];
    for (let j = 0; j < str2.length; j++) {
        matrix.push(getInnerMatrix(str1.length));
    }
    let max = 0;
    let maxIndex = '';
    for (let i = 0; i < matrix.length; i++) {
        const array = matrix[i];
        for (let j = 0; j < array.length; j++) {
            if (str1[j] === str2[i]) {
                if ((i - 1) < 0 || j - 1 < 0) {
                    array[j] = 1;
                } else {
                    array[j] = matrix[i - 1][j - 1] + 1;
                    if (array[j] > max) {
                        max = array[j];
                        maxIndex = `${i}${j}`;
                    }
                }
            } else {
                array[j] = 0;
            }
        }
    }
    let maxI = maxIndex[0];
    let maxJ = maxIndex[1];
    var longestCommonSubstring = [];
    while (matrix[maxI][maxJ] !== 0) {
        if (maxI < 0 || maxJ < 0) {
            break;
        }
        longestCommonSubstring.push(str1[maxJ]);
        maxI--;
        maxJ--;
    }
    return longestCommonSubstring.reverse()
                          .join('');
}
const getInnerMatrix = (length) => {
    let innerMatrix = [];
    for (let i = 0; i < length; i++) {
        innerMatrix[i] = 0
    };
    return innerMatrix
}

console.log(getLongestCommonSubstringUsingDP('zxabcdezy', 'yzabcdezx'));