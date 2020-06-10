/**
Given a binary tree, return the largest BST i.e return the size of the largest BST

Algo:
To determine if a tree is BST, it must satisfy BST constraints
Given a root of a tree, how to find if its a BST. We already know this technique using range-based approach (min,max)
We also know that a leaf node is a BST of size 1, min = val, max = val
So:
We traverse till we reach both leaf nodes of a sub-tree. Then to determine if this sub-tree is a BST, we do BST validation
Which traversal gives us: L , R, Root. Post -order. So we do a post-order traversal
 */
const Node = require('../Tree').Node;
const BinaryTree = require('../Tree').BinaryTree;

class BSTState {
    constructor(isBST,size,min,max){
        this.isBST = isBST;
        this.size = size;
        this.min = min;
        this.max = max;
    }
}
 function getLargestBSTInBinaryTree(root){
    return doPostOrderTraversal(root).size;
    function doPostOrderTraversal(node){
        if(node == null){
            return;
        }
        if(isLeafNode(node)){
            return new BSTState(true,1,node.value,node.value)
        }
        const leftBSTState = doPostOrderTraversal(node.left) || getDefaultBSTState();
        const rightBSTState = doPostOrderTraversal(node.right) || getDefaultBSTState();
        if(leftBSTState.isBST && rightBSTState.isBST){
            // verify if sub-tree with this node as root is a BST. for this we use range technique
            const max = leftBSTState.max;
            const min = rightBSTState.min;
            if(node.val >= max && node.val <= min){
                return new BSTState(true, leftBSTState.size + rightBSTState.size + 1, leftBSTState.min, rightBSTState.max);
            }
        }
        return new BSTState(false,0,0,0);
        
    }

    function getDefaultBSTState(){
        return new BSTState(true,0,0,0);
    }
    function isLeafNode(node){
        return node.left != null && node.right != null;
    }
 }

 const binaryTree = new BinaryTree();
 binaryTree.head = new 
 