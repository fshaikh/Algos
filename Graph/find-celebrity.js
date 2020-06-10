/**
 Suppose you are at a party with n people (labeled from 0 to n - 1) and among them, there may exist one celebrity. The definition of a celebrity is that all the other n - 1 people know him/her but he/she does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: "Hi, A. Do you know B?" to get information of whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function bool knows(a, b) which tells you whether A knows B. Implement a function int findCelebrity(n). There will be exactly one celebrity if he/she is in the party. Return the celebrity's label if there is a celebrity in the party. If there is no celebrity, return -1.

 

Example 1:


Input: graph = [
  [1,1,0],
  [0,1,0],
  [1,1,1]
]
Output: 1
Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j. The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.
Example 2:


Input: graph = [
  [1,0,1],
  [1,1,0],
  [0,1,1]
]
Output: -1
Explanation: There is no celebrity.
 

Note:

The directed graph is represented as an adjacency matrix, which is an n x n matrix where a[i][j] = 1 means person i knows person j while a[i][j] = 0 means the contrary.
Remember that you won't have direct access to the adjacency matrix.

https://leetcode.com/problems/find-the-celebrity/
 */

 // #region Approach 1
 // This approach is derived from find-town-judge. However, in this problem, edges are not provided. So we need
 // to uncover edges by calling knows and populating both outdegrees and indegrees array
 // TC: O(N2) [assuming knows is O(1)]
 // SC: O(N)
 /**
 * Definition for knows()
 * 
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */
var solution = function(knows) {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
    return function(n) {
        // outdegree = 0 and indegree = n-1
        
        // outdegrees array and indegrees array
        const outdegrees = [], indegrees = [];
        for(let i=0;i<n;i++){
            outdegrees[i] = 0;
            indegrees[i] = 0;
        }
        // fill both the arrays using knows and n
        //.   n = 3
        //    make (1,2) , (1,3) (2,3) . 3 calls 
        for(let i=0;i<n;i++){
            for(let j=i+1;j<n;j++){
                const iKnowsj = knows(i,j);
                const jKnowsi = knows(j,i);
                if(iKnowsj){
                    outdegrees[i] = outdegrees[i] +1;
                    indegrees[j] = indegrees[j] + 1;
                }
                if(jKnowsi){
                    outdegrees[j] = outdegrees[j] + 1;
                    indegrees[i] = indegrees[i] + 1;
                }
            }
        }
        
        // get index in outdegrees with count = 0
        const outdegreeZero = outdegrees.findIndex(value => value === 0);
        // if none, return -1
        if(outdegreeZero === -1){
            return -1;
        }
        // get value in indegrees at index
        return indegrees[outdegreeZero] === n - 1 ? outdegreeZero : -1
        // if value = n - 1, return index, else return -1
    };
};
 // #endregion Approach 1

 // #region Approach 2 - Modified version of previous approach
 // In the previous approach, we are unnecessarily storing outdegree and incoming degree. We can do better by
 // removing the space complexity. We still iterate the array in a nested fashion, but rule out a vertex 
 // as a celebrity if: i knows j or j does not know i
 var solution = function(knows) {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
    return function(n) {
        for(let i=0;n;i++){
            if(isVertexCelebrity(i,n)){
                return i;
            }
        }
        return -1;
    }

    function isVertexCelebrity(i,n){
        for(let j=0;j<n;j++){
            if(i == j){
                continue;
            }
            if(knows(i,j) || !knows(j,i)){
                return false;
            }
        }
        return true;
    }
}
 // #endregion Approach 2 - Modified version of previous approach