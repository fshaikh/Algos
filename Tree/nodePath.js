
/**
 * Given a binary tree ,Given a binary tree, return all root-to-leaf paths.
 * Note: A leaf is a node with no children.

Example:

Input:

   1
 /   \
2     3
 \
  5

Output: ["1->2->5", "1->3"]

Explanation: All root-to-leaf paths are: 1->2->5, 1->3
 */
const BinaryTree = require('./Tree').BinaryTree;
const Node = require('./Tree').Node
const Queue = require('../Queue/Queue').Queue;



 var binaryTreePaths = function(root) {
    if(root == null){
        return []
    }
    const paths = [];
    const queue = new Queue();
    const pathMap = new Map();
    queue.enqueue(root);
    pathMap.set(root, null);
    
    while(!queue.isEmpty()){
        const node = queue.dequeue();
        if(isLeafNode(node)){
            // construct the path
            paths.push(getNodePath(node,pathMap));
            continue;
        }
        if(node.left !== null){
            queue.enqueue(node.left);
            pathMap.set(node.left, node)
        }
        if(node.right !== null){
            queue.enqueue(node.right);
            pathMap.set(node.right, node)
        }
    }
    
    return paths;
};

function isLeafNode(node){
    return node.left == null & node.right == null;
}

function getNodePath(node, pathMap){
    let path = node.value;
    let m = pathMap.get(node);
    while(m !== null){
        path = m.value + '->' + path;
        m = pathMap.get(m)
    }
    return path.toString();
}

 const bt = new BinaryTree();
 bt.head = new Node(37);
 bt.head.left = new Node(-34);
 bt.head.right = new Node(-34);
 bt.head.left.right = new Node(-100);
 bt.head.right.left = new Node(-100);
 bt.head.right.right = new Node(48);
 console.log(binaryTreePaths(bt.head));