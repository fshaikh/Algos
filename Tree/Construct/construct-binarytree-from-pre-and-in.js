const Node = require('../Tree').Node;
const BinaryTree = require('../Tree').BinaryTree;

let preOrderIndex = 0;
function constructTreeFromPreAndInOrder(inorder, preorder){
    const root =  constructTreeFromPreAndInOrderCore(inorder,preorder,0);
    const tree = new BinaryTree();
    tree.head = root;
    return tree;
}

function constructTreeFromPreAndInOrderCore(inorder,preorder){
    if(inorder.length === 0){
        return null;
    }
    const rootValue = preorder[preOrderIndex++];
    const root = new Node(rootValue);
    // find the index of root in inorder 
    const inOrderIndex = inorder.findIndex(value => value === rootValue);
    root.left = constructTreeFromPreAndInOrderCore(inorder.slice(0,inOrderIndex),preorder);
    root.right = constructTreeFromPreAndInOrderCore(inorder.slice(inOrderIndex+1,inorder.length),preorder);
    return root;
}



const tree = constructTreeFromPreAndInOrder([3,9,20,15,7],[9,3,15,20,7]);
console.log(tree.doInorderTraversal());


// Usually inorder is always given. And either pre or post. The basic idea is the same
// For pre, root is at the start and we work forward. From inorder we get left and eight subtree
// For post, root is at the end and we work backward.  

// Recusive problem is to then take left and call the function again .Then right and call again