/**
 * Given a binary tree, find its maximum depth.
The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
Example:
Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its depth = 3.
 */

const Queue = require('../Queue/Queue').Queue;
const Node = require('./Tree').Node;
const BinaryTree = require('./Tree').BinaryTree;

//#region Iterative
// Do a level order traversal and store depth for each node
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(root == null){
        return 0;
    }
    let maxDepth = 0;
    let queue = new Queue();
    queue.enqueue(root);
    while(!queue.isEmpty()){
        const node = queue.dequeue();
        if(node.depth > maxDepth){
            maxDepth = node.depth;
        }
        if(node.left != null){
            queue.enqueue(node.left);
            node.left.depth = node.depth + 1;
        }
        if(node.right != null){
            queue.enqueue(node.right);
            node.right.depth = node.depth + 1;
        }
    }
    return maxDepth;
};
//#endregion Iterative

//#region Recursive
//#endregion Recursive


let tree = new BinaryTree();
tree.head = new Node(3);
tree.head.left = new Node(9);
tree.head.right = new Node(20);
tree.head.right.left = new Node(17);
tree.head.right.right = new Node(7);
tree.head.left.left = new Node(19);
tree.head.left.left.right = new Node(90);
console.log(maxDepth(tree.head));