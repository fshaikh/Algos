/**
 Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.

Calling next() will return the next smallest number in the BST.

 

Example:



BSTIterator iterator = new BSTIterator(root);
iterator.next();    // return 3
iterator.next();    // return 7
iterator.hasNext(); // return true
iterator.next();    // return 9
iterator.hasNext(); // return true
iterator.next();    // return 15
iterator.hasNext(); // return true
iterator.next();    // return 20
iterator.hasNext(); // return false
 

Note:

next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.
You may assume that next() call will always be valid, that is, there will be at least a next smallest number in the BST when next() is called.
 */

 // Solutions
 //                TC      SC
 //  In-order      O(1)    O(N)
 //  Stack-based   O(N) WC  O(H)
 //                O(1) AC

 //#region Solution 1
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
 */
// var BSTIterator = function(root) {
//     this.inOrder = [];
//     this.currentIndex = 0;
//     const doInOrder = (node) => {
//         if(node == null){
//             return;
//         }
//         doInOrder(node.left);
//         this.inOrder.push(node.val);
//         doInOrder(node.right);
//     }
//     doInOrder(root);
//     this.length = this.inOrder.length;
// };

// /**
//  * @return the next smallest number
//  * @return {number}
//  */
// BSTIterator.prototype.next = function() {
   
//         return this.inOrder[this.currentIndex++];
    
    
// };

// /**
//  * @return whether we have a next smallest number
//  * @return {boolean}
//  */
// BSTIterator.prototype.hasNext = function() {
//     if(this.length == 0 || this.currentIndex > this.length-1){
//         return false;
//     }
//     return true;
// };

/** 
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
 // #endregion Solution 1


 // #endregion Solution 2
 // Before attempting this, do an in-order traversal iteratively. the same stack approach is used here

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
 */
const Stack = require('../Stack/Stack').Stack;
var BSTIterator = function(root) {
    this.stack = new Stack();
    this.walkLeftSubtree(root);
};
BSTIterator.prototype.walkLeftSubtree = function(node){
    while(node != null){
        this.stack.push(node);
        node = node.left;
    }
}
/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
   const nextElement = this.stack.pop();
   if(nextElement.right !== null){
       this.walkLeftSubtree(nextElement.right);
   }
    
   return nextElement.val;
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return !this.stack.isEmpty();
};

/** 
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
 // #endregion Solution 2