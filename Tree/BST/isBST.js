const BinaryTree = require('../Tree').BinaryTree;
const Node = require('../Tree').Node;

/**
 * Given a root of a binary tree, return true if the tree is a BST, else false
 * Constraints:
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

 //#region In-order traversal
 function isBST(root){
    let currentValue = Number.MIN_SAFE_INTEGER;
    const visitNode = (node,value)=>{
        if(value > currentValue){
            currentValue = value;
            return true;
        }
        return false;
    }
    return isBSTCore(root,visitNode);
 }

 function isBSTCore(node,visitNode){
     if(node == null){
         return true;
     }
    isBSTCore(node.left,visitNode);
     let isValid = visitNode(node,node.value);
     if(!isValid){
         return false;
     }
    isBSTCore(node.right,visitNode);
    return true;
 }
 //#endregion In-order traversal

 //#region Range comparison
 const isBSTUsingRange = function(root){
     const MIN_RANGE = Number.NEGATIVE_INFINITY,
           MAX_RANGE = Number.POSITIVE_INFINITY;
     return isBSTUsingRangeCore(root,MIN_RANGE,MAX_RANGE);
 }

 function isBSTUsingRangeCore(node,MIN_RANGE,MAX_RANGE){
    if(node == null){
        return true;
    }
    return (node.value > MIN_RANGE && node.value < MAX_RANGE) ? 
         isBSTUsingRangeCore(node.left, MIN_RANGE, node.value) &&
         isBSTUsingRangeCore(node.right,node.value,MAX_RANGE)
        : false;
    
 }
 //#endregion Range comparison


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
console.log(isBSTUsingRange(tree.head));




