/**
Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \    / \
7    2  5   1
Return:

[
   [5,4,11,2],
   [5,8,4,5]
]
 */

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
 * @param {number} sum
 * @return {number[][]}
 * @description - This is a combination of finding path which adds upto sum and constructing path
 *                Finding path which adds to sum => this technique is already done in path-sum-1
 *                Reconstructing path => a) map approach which is slow b) construct path while traversing. Key thing is to pop and clone array
 */
var pathSum = function(root, sum) {
    const paths = [];
    
    function pathSumCore(node,sum,total,pathArray){
        if(node == null){
            return;
        }
        total += node.val;
        pathArray.push(node.val);
        if(isLeafNode(node) && total === sum){
            paths.push([...pathArray]);
        }
        pathSumCore(node.left,sum,total,pathArray);
        pathSumCore(node.right,sum,total,pathArray);
  
        pathArray.pop();
    }
      
      
    pathSumCore(root,sum,0,[]);
    return paths;
  };
  
  function isLeafNode(node){
      return node.left == null && node.right == null;
  }