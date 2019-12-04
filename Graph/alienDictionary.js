/*
Given a sorted dictionary (array of words) of an alien language, find order of characters in the language.
Examples:

Input:  words[] = {"baa", "abcd", "abca", "cab", "cad"}
Output: Order of characters is 'b', 'd', 'a', 'c'
Note that words are sorted and in the given language "baa" 
comes before "abcd", therefore 'b' is before 'a' in output.
Similarly we can find other orders.

Input:  words[] = {"caa", "aaa", "aab"}
Output: Order of characters is 'c', 'a', 'b'
*/

const Graph = require('./Graph.js').Graph;
function getCharacterOrder(words) {
    const graph = new Graph();
    // go through words
    for (let index = 0; index < words.length - 1; index++) {
        const word1 = words[index];
        const word2 = words[index+1];
        // find the first mismatching character in the 2 words being compared
        let firstWordIndex = 0,
            secondWordIndex = 0;
        while(firstWordIndex < word1.length || secondWordIndex.length < word2.length){
            const char1 = word1[firstWordIndex];
            const char2 = word2[secondWordIndex];
            if(char1 !== char2){
                graph.addEdge(char1,char2);
                break;
            }
            firstWordIndex++;
            secondWordIndex++;
        }
    }
    return graph.doTopologicalSort();
}

console.log(getCharacterOrder([
    "z",
    "x"
  ]));