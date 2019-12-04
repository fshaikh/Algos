/**
 * Given a binary tree and a node, return the path from root to node 
 */
const Queue = require('../Queue/Queue').Queue;
const BinaryTree = require('./Tree').BinaryTree;
const Node = require('./Tree').Node;
 const getNodePath = (root,node) => {
    const queue = new Queue();
    const pathMap = new Map();
    queue.enqueue(root);
    pathMap.set(root.value,null);
    const path = [];
    while(!queue.isEmpty()){
        const n = queue.dequeue();
        if(n == null){
            queue.dequeue();
            continue;
        }
        if(n.value === node){
            break;
        }
        queue.enqueue(n.left);
        queue.enqueue(n.right);
        if(n.left !== null){
            pathMap.set(n.left.value,n.value);
        }
        
        if(n.right !== null){
            pathMap.set(n.right.value,n.value);
        }
    }
    let m = pathMap.get(node);
    if(m == null){
        return [];
    }
    path.unshift(node);
    while(m !== null){
        path.unshift(m);
        m = pathMap.get(m);
    }
    return path;
 };

 module.exports = {
     getNodePath
 }
//  const bt = new BinaryTree();
//  bt.head = new Node(1);
//  bt.head.left = new Node(2);
//  bt.head.right = new Node(3);
//  bt.head.left.left = new Node(4);
//  bt.head.left.right = new Node(5);
//  bt.head.right.left = new Node(6);
//  bt.head.right.right = new Node(7);

//  console.log(getNodePath(bt.head,5)); // [1,2,5]
//  console.log(getNodePath(bt.head,7)); // [1,3,7]