/**
 Given a paragraph and a list of banned words, return the most frequent word that is not in the list of banned words.  It is guaranteed there is at least one word that isn't banned, and that the answer is unique.

Words in the list of banned words are given in lowercase, and free of punctuation.  Words in the paragraph are not case sensitive.  The answer is in lowercase.

 

Example:

Input: 
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]
Output: "ball"
Explanation: 
"hit" occurs 3 times, but it is a banned word.
"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
Note that words in the paragraph are not case sensitive,
that punctuation is ignored (even if adjacent to words, such as "ball,"), 
and that "hit" isn't the answer even though it occurs more because it is banned.
 

Note:

1 <= paragraph.length <= 1000.
0 <= banned.length <= 100.
1 <= banned[i].length <= 10.
The answer is unique, and written in lowercase (even if its occurrences in paragraph may have uppercase symbols, and even if it is a proper noun.)
paragraph only consists of letters, spaces, or the punctuation symbols !?',;.
There are no hyphens or hyphenated words.
Words only consist of letters, never apostrophes or other punctuation symbols.
 */
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  // convert banned to a map
  const bannedMap = new Map();
  const countMap = new Map();
  for (let i = 0; i < banned.length; i++) {
    bannedMap.set(banned[i], 1);
  }
  // split paragraph
  let index = 0;
  while (index < paragraph.length) {
    let word = "";
    while (index < paragraph.length && !isNoise(paragraph[index])) {
      word += paragraph[index];
      index++;
    }
    if (isNoise(paragraph[index])) {
      index++;
    }
    if (word === "") {
      continue;
    }
    const transformedWord = word.toLowerCase();
    if (!bannedMap.has(transformedWord)) {
      countMap.set(transformedWord, (countMap.get(transformedWord) || 0) + 1);
    }
  }
  let maxCount = -1,
    word = "";
  for (let [key, value] of countMap.entries()) {
    if (value > maxCount) {
      maxCount = value;
      word = key;
    }
  }
  return word;
};

function isNoise(value) {
  if (value == null || value === "") {
    return true;
  }
  const val = value.toLowerCase().charCodeAt(0);
  return val < 97 || val > 126;
}

console.log(mostCommonWord("a, a, a, a, b,b,b,c, c"["a"]));
