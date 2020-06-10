/**
 Algorithm:
1. Compute path for each given node from root > node
2. Compare the 2 paths till we find a non-matching node. That matching node is the common ancestor

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1

LCA(13,1) = 8
P[13] = [5,8,13]
P[1]  = [5,8,4,1]
Start comparing the 2 paths. 5 = 5 , so continue. 8 = 8, so continue, 13 != 4. So we have diverged now. So LCA is 8

TC: O(N) - Since we traverse the tree from root to node
SC: O(N) - Since we store the path of both the nodes
 */
function getLCA(node1, node2){
    const path1 = getNodePath(node1);
    const path2 = getNodePath(node2);

    let candidateLCA = null,index = 0;

    while(index < path1.length && index < path2.length){
        if(path1[index] === path2[index]){
            candidateLCA = path1[index];
            index++;
        }else{
            break;
        }
    }
    return candidateLCA;
}

function getNodePath(node){

}

const Tree = require('../Tree').BinaryTree;
 const Node = require('../Tree').Node;

 const tree = new Tree();
 tree.head = new Node(5);
 tree.head.left = new Node(4);
 tree.head.right = new Node(8);
 tree.head.left.left = new Node(11);
 tree.head.left.left.left = new Node(7);
 tree.head.left.left.right = new Node(2);
 tree.head.right.left = new Node(13);
 tree.head.right.right = new Node(4);
 tree.head.right.right.right = new Node(1);

