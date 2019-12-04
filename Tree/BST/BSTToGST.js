/**
 * Given the root of a binary search tree with distinct values, modify it so that every node has a new value equal to the sum of the values of the original tree that are greater than or equal to node.val.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:



Input: [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
 

Note:

The number of nodes in the tree is between 1 and 100.
Each node will have value between 0 and 100.
The given tree is a binary search tree.

Complexity:
Time: O(N)
Space: O(1)

 * @param {*} root 
 */
const BinaryTree = require('../Tree').BinaryTree;
const Node = require('../Tree').Node;

let sum = 0;
var bstToGst = function(root) {
    doReverseInorderTraversal(root,0);
};

function doReverseInorderTraversal(node){
    if(node == null){
        return;
    }
    doReverseInorderTraversal(node.right);
    sum += node.value;
    node.value = sum;;
    doReverseInorderTraversal(node.left);
}

let tree = new BinaryTree();
const root = tree.head = new Node(18);
root.left = new Node(9);
root.right = new Node(27);
root.left.left = new Node(6);
root.left.right = new Node(15);
root.left.left.left = new Node(3);
root.left.right.left = new Node(12);
root.right.left = new Node(24);
// root.right.left.left = new Node(15);
root.right.right = new Node(30);

bstToGst(tree.head);
console.log(tree);
let nodes = [];
const visit = (node) => {
    nodes.push(node.value);
}
doInorderTraversal(tree.head,visit);
 console.log(nodes);
