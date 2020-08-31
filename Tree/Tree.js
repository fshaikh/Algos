const Queue = require("../Queue/Queue").Queue;
const Stack = require("../Stack/Stack").Stack;

class Node {
  constructor(value, level) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.level = level;
  }
}

class BinaryTree {
  constructor() {
    this.head = null;
  }

  // #region Traversals
  doInorderTraversal() {
    let array = [];
    this.inOrderCore(this.head, array);
    return array;
  }

  inOrderCore(node, array) {
    if (node == null) {
      return;
    }
    this.inOrderCore(node.left, array);
    array.push(node.value);
    this.inOrderCore(node.right, array);
  }

  inOrderIterative() {
    const stack = new Stack();
    const inOrder = [];
    let temp = this.head;
    while (temp != null || !stack.isEmpty()) {
      while (temp != null) {
        stack.push(temp);
        temp = temp.left;
      }
      temp = stack.pop();
      inOrder.push(temp.value);
      temp = temp.right;
    }

    return inOrder;
  }

  /**
   * This functions does a level order traversal of the binary tree
   * and returns the node's values
   */
  doLevelOrderTraversal() {
    // Holds the output values
    let array = [];
    // Queue to store each visited node
    const queue = new Queue();
    // Push the root node in the queue
    queue.enqueue(this.head);
    // Continue the logic till the queue is not empty at which point all the nodes
    // have been dequeued
    while (!queue.isEmpty()) {
      // Remove the first node from the queue
      const node = queue.dequeue();
      array.push(node.value);
      // Add node's children to  the queue
      if (node.left != null) {
        queue.enqueue(node.left);
      }
      if (node.right != null) {
        queue.enqueue(node.right);
      }
    }
    return array;
  }

  /**
   * Returns level for each node in a binary tree
   */
  getNodesLevel() {
    const queue = [],
      map = new Map(),
      nodeLevels = [];
    queue.unshift(this.head);
    map.set(this.head, 0);

    while (queue.length !== 0) {
      const node = queue.shift();
      if (node.left != null) {
        queue.unshift(node.left);
        map.set(node.left, map.get(node) + 1);
      }
      if (node.right != null) {
        queue.unshift(node.right);
        map.set(node.right, map.get(node) + 1);
      }
    }
    for (let [key, value] of map.entries()) {
      nodeLevels.push([key.value, value]);
    }
    return nodeLevels;
  }

  /**
   * This functions does a zigzag traversal of the binary tree
   * and returns the node's values
   * This problem can be solved using two stacks.
   *  Assume the two stacks are current: currentlevel and nextlevel.
   *  We would also need a variable to keep track of
   *  the current level order(whether it is left to right or right to left).
   *  We pop from the currentlevel stack and print the nodes value.
   *  Whenever the current level order is from left to right,
   *      push the nodes left child,
   *      then its right child to the stack nextlevel.
   *  Since a stack is a LIFO(Last-In-First_out) structure, next time when nodes are popped off nextlevel,
   *  it will be in the reverse order. On the other hand, when the current level order is from right to left,
   * we would push the nodes right child first, then its left child.
   *  Finally, do-not forget to swap those two stacks at the end of each level(i.e., when current level is empty)
   */
  doZigZagTraversal() {
    let array = [];
    let currentLevel = new Stack();
    let nextLevel = new Stack();
    let leftToRight = true;
    currentLevel.push(this.head);
    while (!currentLevel.isEmpty()) {
      const node = currentLevel.pop();
      array.push(node.value);
      if (leftToRight) {
        if (node.left != null) {
          nextLevel.push(node.left);
        }
        if (node.right != null) {
          nextLevel.push(node.right);
        }
      } else {
        if (node.right != null) {
          nextLevel.push(node.right);
        }
        if (node.left != null) {
          nextLevel.push(node.left);
        }
      }
      if (currentLevel.isEmpty()) {
        let temp = currentLevel;
        currentLevel = nextLevel;
        nextLevel = temp;
        leftToRight = !leftToRight;
      }
    }
    return array;
  }
  // #endregion Traversals

  //#region Tree Properties
  /**
   * Height of a binary tree is the number of nodes in the longest path from root to leaf
   */
  height() {
    return heightCore(this.head) - 1;
    function heightCore(node) {
      if (node == null) {
        // height of a binary tree is 0
        return 0;
      }
      const leftHeight = heightCore(node.left);
      const rightHeight = heightCore(node.right);
      return 1 + Math.max(leftHeight, rightHeight);
    }
  }

  /**
   * The minimum depth(height):
   *  Number of nodes along the shortest path from the root node down to the nearest leaf node.
   */
  minHeight(){
    return minDepthCore(root);
    
    function minDepthCore(node){
        if(node == null){
            return 0;
        }
        const leftHeight = 1 + minDepthCore(node.left)
        const rightHeight = 1 + minDepthCore(node.right)
        if(rightHeight === 1){
            return leftHeight
        }
        if(leftHeight == 1){
            return rightHeight
        }
        return Math.min(leftHeight,rightHeight)
    }
  }

  /**
   * Diameter - Number of nodes in the longest path between any 2 nodes(leaves)
   */
  diameterOfBinaryTree() {
    const context = this;
    // if path passes from root, diameter is: leftHeight + rightHeight + 1
    // if path does not pass from root: diameter(left) + diameter(right)
    // diamter : max(lh + rh + 1, diameter(left)+diamter(right))
    // See this for explaination: https://www.youtube.com/watch?reload=9&v=ey7DYc9OANo
    return d(this.head,0);
    function diameter(node) {
      if (node == null) {
        return 0;
      }
      const leftHeight = context.height(node.left);
      const rightHeight = context.height(node.right);
      const rootDiameter = leftHeight + rightHeight;

      const leftDiameter = diameter(node.left);
      const rightDiameter = diameter(node.right);
      const nonRootDiameter = Math.max(leftDiameter, rightDiameter);
      return Math.max(rootDiameter, nonRootDiameter);
    }

    function d(node,result){
      if(node == null){
        return 0;
      }
      const leftDiameter = d(node.left,result);
      const rightDiameter = d(node.right,result);

      const temp = Math.max(leftDiameter,rightDiameter) + 1;
      const answer = Math.max(temp, leftDiameter + rightDiameter + 1);
      return Math.max(answer,result);
    }
  }
  //#endregion Tree Properties
}
module.exports = {
  Node: Node,
  BinaryTree: BinaryTree,
};
let tree = new BinaryTree();
tree.head = new Node(7);
tree.head.left = new Node(3);
tree.head.right = new Node(13);
tree.head.left.left = new Node(1);
tree.head.left.right = new Node(6);
tree.head.right.left = new Node(23);
tree.head.left.left.right = new Node(10);
console.log(tree.height());

// console.log(tree.doZigZagTraversal());

// Algo:
// 1. Do all basic traversals: inorder, preorder, postorder, level order, zigzag
// 2. Find if tree is BST
// 3. Get Left/Right view of a binary tree
