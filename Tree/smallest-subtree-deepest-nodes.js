/**
 Given a binary tree rooted at root, the depth of each node is the shortest distance to the root.

A node is deepest if it has the largest depth possible among any node in the entire tree.

The subtree of a node is that node, plus the set of all descendants of that node.

Return the node with the largest depth such that it contains all the deepest nodes in its subtree.

 

Example 1:

Input: [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explaination:
We return the node with value 2, colored in yellow in the diagram.
The nodes colored in blue are the deepest nodes of the tree.
The input "[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]" is a serialization of the given tree.
The output "[2, 7, 4]" is a serialization of the subtree rooted at the node with value 2.
Both the input and output have TreeNode type.
 */
const Node = require("./Tree").Node;
const BinaryTree = require("./Tree").BinaryTree;
var subtreeWithAllDeepest = function (root) {
  // ALGO:
  // get max depth and depth for each node
  // traverse the tree and find lca for the nodes with same depth

  let maxDepth = maxDepthAndNodeDepth(root, null);
  return getParentForMaxDepthNodes(root);

  function maxDepthAndNodeDepth(node, parent) {
    if (node == null) {
      return 0;
    }
    if (parent == null) {
      node.depth = 1;
    } else {
      node.depth = parent.depth + 1;
    }

    return (
      1 +
      Math.max(
        maxDepthAndNodeDepth(node.left, node),
        maxDepthAndNodeDepth(node.right, node)
      )
    );
  }

  function getParentForMaxDepthNodes(node) {
    if (node == null) {
      return null;
    }
    if (node.depth === maxDepth) {
      return node;
    }
    const left = getParentForMaxDepthNodes(node.left);
    const right = getParentForMaxDepthNodes(node.right);
    if (left != null && right != null) {
      return node;
    }
    return left || right || null;
  }
};

let tree = new BinaryTree();
tree.head = new Node(10);
tree.head.left = new Node(8);
tree.head.right = new Node(2);
tree.head.left.left = new Node(3);
tree.head.left.right = new Node(5);
tree.head.right.left = new Node(6);
tree.head.right.right = new Node(7);
tree.head.left.left.left = new Node(9);
tree.head.left.left.right = new Node(12);

console.log(subtreeWithAllDeepest(tree.head));
