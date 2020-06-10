/**
 Given a binary tree containing digits from 0-9 only, each root-to-leaf path could represent a number.

An example is the root-to-leaf path 1->2->3 which represents the number 123.

Find the total sum of all root-to-leaf numbers.

Note: A leaf is a node with no children.

Example:

Input: [1,2,3]
    1
   / \
  2   3
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.
Example 2:

Input: [4,9,0,5,1]
    4
   / \
  9   0
 / \
5   1
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.
 */

 // # region Approach 1 - Suboptimal O(N2)
 /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    // start from root
    // do a DFS, when a leaf node is encountered, 
    let sum = 0;
    
    function sumNumbersCore(node,pathList){
        if(node == null){
            return;
        }
        pathList.push(node.val);
        if(isLeafNode(node)){
            sum += +pathList.reduce((number,value) => number + value,'');
        }
        sumNumbersCore(node.left, pathList);
        sumNumbersCore(node.right, pathList);
        pathList.pop();
    }
    sumNumbersCore(root,[])
    return sum;
};

function isLeafNode(node){
    return node.left == null && node.right == null;
}
 // #endregion Approach 1

 // #region Approach 2 - O(N)
 /**
 * @param {TreeNode} root
 * @return {number}
 * @description - We dont need to store the path and then do a reduce. We are interested in the sum of all
 *                root to leaf nodes. We can construct the number as we trverse
 */
var sumNumbers = function(root) {
    let sum = 0;
    function sumNumbersCore(node, currentNumber){
        if(node == null){
            return;
        }
        currentNumber = currentNumber * 10 + node.val;
        if(isLeafNode(node)){
            sum += currentNumber;
        }
        
        sumNumbersCore(node.left,currentNumber);
        sumNumbersCore(node.right, currentNumber);
    }
    sumNumbersCore(root,0)
    return sum;
}
 // #endregion Approach 2 - O(N)