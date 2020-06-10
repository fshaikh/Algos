/**
 * Given a binary tree, get the average value at each level of the tree
 */
const Node = require("./Tree").Node;
const BinaryTree = require("./Tree").BinaryTree;
function getAverageAtEachLevel(root) {
  if (root == null) {
    return [];
  }
  const levelNodes = new Map(),
    queue = [];
  root.level = 0;
  queue.unshift(root);
  while (queue.length !== 0) {
    const node = queue.shift();
    if (!levelNodes.has(node.level)) {
      levelNodes.set(node.level, { value: node.value, count: 1 });
    } else {
      const { value, count } = levelNodes.get(node.level);
      levelNodes.set(node.level, {
        value: value + node.value,
        count: count + 1,
      });
    }

    if (node.left !== null) {
      node.left.level = node.level + 1;
      queue.unshift(node.left);
    }
    if (node.right !== null) {
      node.right.level = node.level + 1;
      queue.unshift(node.right);
    }
  }

  return computeAveragesEfficient(levelNodes);
}

function computeAverages(levelNodes) {
  const averages = [];
  for (let [key, values] of levelNodes) {
    averages.push(values.reduce((sum, value) => sum + value) / values.length);
  }
  return averages;
}

function computeAveragesEfficient(levelNodes) {
  const averages = [];
  for (let [key, values] of levelNodes) {
    averages.push(values.value / values.count);
  }
  return averages;
}

const binaryTree = new BinaryTree();
binaryTree.head = new Node(4);
binaryTree.head.left = new Node(7);
binaryTree.head.right = new Node(9);
binaryTree.head.left.left = new Node(10);
binaryTree.head.left.right = new Node(2);
binaryTree.head.right.right = new Node(6);
binaryTree.head.left.right.right = new Node(6);
binaryTree.head.left.right.right.left = new Node(2);

//console.log(getAverageAtEachLevel(binaryTree.head));

function getMilestoneDays(revenues, milestones) {
  // Write your code here
  const output = [],
    milestonesMap = new Map();
  // store milestone in a map, key = milestone , value :{index: , day:}
  for (let i = 0; i < milestones.length; i++) {
    output[i] = 0;
    milestonesMap.set(milestones[i], { index: i, dayIndex: 0 });
  }
  // sort milestones in ascending order
  milestones.sort((a, b) => a - b);

  let sum = 0,
    index = 0;
  // iterate the revenues
  for (let i = 0; i < revenues.length; i++) {
    sum += revenues[i];
    while (sum >= milestones[index] && index < milestones.length) {
      milestonesMap.get(milestones[index]).dayIndex = i + 1;
      index++;
    }
  }
  for (let [key, value] of milestonesMap.entries()) {
    output[value.index] = value.dayIndex;
  }
  // sum up the revenues .when sum >= milestones[i]
  //    update map to add day
  //    since multiple milestones can be achieved, iterate the milestones to mark them as reached
  // parse the
  return output;
}

console.log(
  getMilestoneDays(
    [700, 800, 600, 400, 600, 700],
    [3100, 2200, 800, 2100, 1000]
  )
);
