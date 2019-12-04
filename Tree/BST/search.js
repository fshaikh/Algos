const BinaryTree = require('../Tree').BinaryTree;
const Node = require('../Tree').Node;

/**
 * 
 * @param {*} root - Root of the binary tree to search in 
 * @param {*} value - Value to search for
 * @returns - True , if value is found else false
 * @description - Time Complexity O(logN), depending on the BST structure. Worst case is O(N)
 */
function search(root,value){
    let noOfComparisons = 0;
    const visitNode = (node,value) => {
        noOfComparisons++;
    };
    const isFound =  doSearch(root,value,visitNode);
    return {
        isFound,
        noOfComparisons
    }
}

function doSearch(node,value,visitNodeFn){
    if(node == null){
        return false;
    }
    visitNodeFn(node,value);
    if(node.value === value){
        return true;
    }
    if(node.value > value){
        return doSearch(node.left,value,visitNodeFn);
    }
    if(node.value < value){
        return doSearch(node.right,value,visitNodeFn);
    }
    return false;
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
root.right.left.left = new Node(21);
root.right.right = new Node(30);
console.log(search(tree.head,12));