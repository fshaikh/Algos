// do pre-order traversal and find the node in the tree 
// which is same as the root node of the sub tree

// call isSameTree function passing the node and root of sub tree which does content and structuraa
// comparison. This is a subproblem: given 2 trees find if they are the same

/**
 * Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values
 * with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants.
 * The tree s could also be considered as a subtree of itself.
 * @param {*} s 
 * @param {*} t 
 */
const Node = require('./Tree').Node;
const BinaryTree = require('./Tree').BinaryTree;

/**
 * Algorithm:
 *  1. Do preorder traversal for both the trees.
 *          Concat node value to form a string. Key thing to note:
 *              Append # or some other special character before each node value. This is to help distinguish for eg:  23 from 2 3
 *  2. Check if subtree preorder string is present in the tree preorder string. Use KMP or some other optimal string matching algorithms
 * @param {*} s 
 * @param {*} t 
 */
var isSubtree = function(s, t) {
    const bigTreePreOrder = getPreorderString(s);
    const subtreePreOrder = getPreorderString(t);
    return bigTreePreOrder.includes(subtreePreOrder);
};

function getPreorderString(node){
    let preOrderString = '';
    const visitFn = (node,dir) => {
        preOrderString += node == null ? dir === 1 ? '@lnull' : '@rnull' : `@${node.value}`;
    }
    doPreOrder(node,visitFn);
    return preOrderString;
}

function doPreOrder(node,visitFn,dir = 0){
    if(node == null){
        visitFn(node,dir);
        return;
    }
    // visit root
    visitFn(node);
    // visit left
    doPreOrder(node.left,visitFn,1);
    doPreOrder(node.right,visitFn,2);
}





let tree = new BinaryTree();
tree.head = new Node(1);
// tree.head.left = new Node(4);
// tree.head.right = new Node(5);
// tree.head.left.left = new Node(1);
// tree.head.left.right = new Node(2);

let subTree = new BinaryTree();
subTree.head = new Node(0);
// subTree.head.left = new Node(1);
// subTree.head.right = new Node(2);

// console.log(isSubtree(tree.head,subTree.head));
console.log(isSubtree(tree.head,subTree.head));


// Concepts:
// Pre order traversal
// determine if two trees are same



