/**
In an alien language, surprisingly they also use english lowercase letters, but possibly in a
different order. The order of the alphabet is some permutation of lowercase letters.

Given a sequence of words written in the alien language, and the order of the alphabet,
return true if and only if the given words are sorted lexicographicaly in this alien language.
 
Example 1:

Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
Example 2:

Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
Example 3:

Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character (More info).
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 20
order.length == 26
All characters in words[i] and order are English lowercase letters.

 */
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
    const map = new Map();
    map.set('',-1);
    for(let i=0;i<order.length;i++){
        map.set(order[i],i);   
    }
    for(let i=0;i<words.length;i++){
        if(i === words.length - 1){
            continue;
        }
        const word1 = words[i],word2 = words[i+1];
        const {letter1,letter2} = getFirstNonMatchingPair(word1,word2);
        if(letter1 === '1' && letter2 === '1'){
            continue;
        }
        if(map.get(letter1) > map.get(letter2)){
            return false;
        }
    }
    return true;
};

function getFirstNonMatchingPair(word1,word2){
    let word1Index = 0, word2Index = 0;
    while(word1Index < word1.length - 1 && word2Index < word2.length){
        const letter1 = word1[word1Index++], letter2 = word2[word2Index++];
        if(letter1 !== letter2){
            return {letter1, letter2}
        }
    }
    // either same words or one has finished earlier. for eg: apple, app
    if(word1Index < word1.length){
        return {letter1: word1[word1Index], letter2:''}
    }
    if(word2Index < word2.length){
        return {letter1: '', letter2: word2[word2Index]}
    }
    return {letter1: '1',letter2: '1'}
}

var isAlienSorted2 = function(words, order) {
    const orderMap = new Map();
    for(let i=0;i< order.length;i++){
        orderMap.set(order[i],i+1)
    };
    orderMap.set('',0);
    for(let i=0;i<words.length;i++){
        if(i === words.length - 1){
            continue;
        }
        const firstWord = words[i], secondWord = words[i+1];
        const isSorted = isSortedWords(firstWord,secondWord,orderMap);
        if(!isSorted){
            return false;
        }
    }
    return true;
};

function isSortedWords(firstWord,secondWord,orderMap){
    let firstWordIndex = 0, secondWordIndex = 0;
    while(firstWordIndex < firstWord.length && secondWordIndex < secondWord.length){
        const letter1 = firstWord[firstWordIndex++];
        const letter2 = secondWord[secondWordIndex++];
        if(orderMap.get(letter1) > orderMap.get(letter2)){
            return false;
        }
        if(orderMap.get(letter1) < orderMap.get(letter2)){
            return true;
        }
    }
    if(firstWordIndex < firstWord.length){
        return false
    }
    return true;
}

console.log(isAlienSorted(["apple","app"],'abcdefghijklmnopqrstuvwxyz'));