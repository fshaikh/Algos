/**
 * Get the lowest common ancestor for two nodes in a binary tree
 */

const BinaryTree = require('./Tree').BinaryTree;
const Node = require('./Tree').Node;
const getNodePath = require('./getNodePath').getNodePath;

 const getLCA = (root,node1,node2) => {
    if(root == null){
        return -1;
    }
    // store the path from root to node 1 in an array
    const node1Path = getNodePath(root,node1);
    // store the path from root to node 2 in an array
    const node2Path = getNodePath(root,node2);
    // traverse the 2 arrays till the mismatch is found.
    //  Return the node right before the mismatch
    let index1 = 0, index2 = 0,lcaIndex = -1;
    while(index1 < node1Path.length || index2 < node2Path.length){
        if(node1Path[index1] === node2Path[index2]){
            index1++;
            index2++;
            lcaIndex++;
            continue;
        }
        break;
    }
    return node1Path[lcaIndex];
 };




 const bt = new BinaryTree();
 bt.head = new Node(1);
 bt.head.left = new Node(2);
 bt.head.right = new Node(3);
 bt.head.left.left = new Node(4);
 bt.head.left.right = new Node(5);
 bt.head.right.left = new Node(6);
 bt.head.right.right = new Node(7);

 console.log(getLCA(bt.head,4,5)); // 2
 console.log(getLCA(bt.head,4,6)); // 1
 console.log(getLCA(bt.head,3,4)); // 1
 console.log(getLCA(bt.head,2,4)); //2



