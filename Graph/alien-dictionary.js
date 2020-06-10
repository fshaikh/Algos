/**
 * There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you.
 *  You receive a list of non-empty words from the dictionary, where words are sorted lexicographically
 *  by the rules of this new language. Derive the order of letters in this language.

Example 1:

Input:
[
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
]

Output: "wertf"
Example 2:

Input:
[
  "z",
  "x"
]

Output: "zx"
Example 3:

Input:
[
  "z",
  "x",
  "z"
] 

Output: "" 

Explanation: The order is invalid, so return "".
Note:

You may assume all letters are in lowercase.
If the order is invalid, return an empty string.
There may be multiple valid order of letters, return any one of them is fine.
 */

 const Graph = require('./Graph').Graph;
 var alienOrder = function(words) {
  const graph = new Graph();
  // construct the graph with each unique letter as a vertex
  words.forEach(word => {
     for(let i=0;i<word.length;i++){
         graph.addVertex(word[i])
     } 
  });
  for(let i=0;i<words.length-1;i++){
      const word1 = words[i];
      const word2 = words[i+1];
      if(word1.length > word2.length && word1.startsWith(word2)){
          return '';
      }
          let word1Index = 0, word2Index = 0;
          while(word1Index < word1.length && word2Index < word2.length){
              const w1 = word1[word1Index++];
              const w2 = word2[word2Index++]
              if( w1 !== w2){
                  graph.addEdge(w1,w2)
                  break;
              }
          }
      
  }
  return graph.doTopologicalSortUsingKahn().join('');
};

console.log(alienOrder(
  ["ccda", "ccbk", "cd", "a", "ab"]
  
  ));
  // ["wxqkj","whqg","cckgh","cdxg","cdxdt","cdht","ktgxt","ktgch","ktdw","ktdc","jqw","jmc","jmg"]
  // ["ri","xz","qxf","jhsguaw","dztqrbwbm","dhdqfb","jdv","fcgfsilnb","ooby"]
  // ["ccda", "ccb", "cd", "a", "ab", "d"]