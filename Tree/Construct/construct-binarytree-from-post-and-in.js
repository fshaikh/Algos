const Node = require('../Tree').Node;
const BinaryTree = require('../Tree').BinaryTree;

var postOrderIndex = 0;

function constructBinaryTreeFromPostAndInOrder(inorder,postorder){
    postOrderIndex = postorder.length - 1;
    const root =  constructBinaryTreeFromPostAndInOrderCore(inorder,postorder);
    const tree = new BinaryTree();
    tree.head = root;
    return tree;
}

function constructBinaryTreeFromPostAndInOrderCore(inorder,postorder){
    if(inorder.length == 0 || postOrderIndex < 0){
        return null;
    }
    const rootValue = postorder[postOrderIndex--];
    const node = new Node(rootValue);
    const inOrderIndex = inorder.findIndex(value => value === rootValue);
    node.right =  constructBinaryTreeFromPostAndInOrderCore(inorder.slice(inOrderIndex+1,inorder.length),postorder)
    node.left =  constructBinaryTreeFromPostAndInOrderCore(inorder.slice(0,inOrderIndex),postorder)
    
    return node;
}

const tree = constructBinaryTreeFromPostAndInOrder([9,3,15,20,7],[9,15,7,20,3]);
console.log(tree.doInorderTraversal());