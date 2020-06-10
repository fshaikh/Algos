/**
 Given a root of a binary tree, a start node, and an integer value k, return all nodes of the bonary tree
 which are at 'k' distance from start node. Nodes can be returned in any order
        10
      /    \
     3      5
   /   \     \
  6     7     9
      /   \
     8     11 
Example1:
Root = 10, start node = 3, k = 2, o/p = [8,11,5]
Root = 10, start = 6, k =3, o/p = [5]

Algorithm:
In a binary tree, we cannot traverse from child node to parent node. For eg, in Example1, at node 3, we need to be able to
traverse to node 10 which is a parent, but we cannot. So to solve this problem, we need to consider the binary tree
as a directed graph. Where edges are always directed from parent to child node. Algorithm has 2 parts:
1. Traverse the tree and create a map of node -> parent
2. Do a BFS starting from start vertex
      Children of a node are : left, right and parent (get from the map created in Step 1)
 */
const Node = require('./Tree').Node;
const BinaryTree = require('./Tree').BinaryTree;

function getNodesAtKDistance(root, startNode, k) {
  if (root == null || startNode == null) {
    return [];
  }
  const nodes = [],
    parentMap = new Map(),
    queue = [],
    visited = new Set();

  populateParentMap(root,null);
  getNodes();

  function populateParentMap(node,parent){
    if(node == null){
        return;
    }
    // visit
    parentMap.set(node,parent);
    // walk left subtree
    populateParentMap(node.left, node);
    // walk right sub tree
    populateParentMap(node.right, node);
  }

  function getNodes(){
      startNode.level = 0;
      queue.unshift(startNode);
      visited.add(startNode);
      while(queue.length !== 0){
          const node = queue.shift();
          
          if(node.level === k){
              nodes.push(node.value);
          }
          const children = getChildren(node);
          children.forEach(childNode => {
            if(childNode !== null && !visited.has(childNode)){
                childNode.level = node.level + 1;
                visited.add(childNode);
                queue.unshift(childNode)
            }
          });
      }
  }

  function getChildren(node){
      return [node.left, node.right, parentMap.get(node)];
  }

  function printParentMap(){
      for(let [key,value] of parentMap.entries()){
          const val = value == null? 'null': value.value
          console.log(key.value, val)
      }
  }

  return nodes;
}

const binaryTree = new BinaryTree();
binaryTree.head = new Node(10);
let head = binaryTree.head;
head.left = new Node(3);
head.right = new Node(5);
head.left.left = new Node(6);
head.left.right = new Node(7);
head.left.right.left = new Node(8);
head.left.right.right = new Node(11);
head.right.right = new Node(9);

console.log(getNodesAtKDistance(head,head.left.left,2));
