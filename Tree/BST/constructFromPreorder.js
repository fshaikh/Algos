/**
 * Given a preorder traversal of a BST, construct BST and return the root
 */
const BinaryTree = require('../Tree').BinaryTree;
const Node = require('../Tree').Node;

const constructFromPreOrder = function(preOrder){
    const minRange = Number.NEGATIVE_INFINITY,
          maxRange = Number.POSITIVE_INFINITY;
    const bst = new BinaryTree();
    constructFromPreOrderCore(preOrder,bst.head,minRange,maxRange,0);
    return bst;
};

function constructFromPreOrderCore(preOrder,node,minRange,maxRange,index){
    if(preOrder[index] > minRange && preOrder[index] < maxRange){
        if(node == null){
            node = new Node(preOrder[index]);
        }
        node.left = constructFromPreOrderCore(preOrder,node,minRange,node.value,index++);
        
    }
}

console.log(constructFromPreOrder([8,5,1,7,10,12]));