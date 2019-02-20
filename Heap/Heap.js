//References:
// https://www.youtube.com/watch?v=40iljMQmqmY
// https://www.youtube.com/watch?v=2fA1FdxNqiE
// https://www.youtube.com/watch?v=HI97KDV23Ig

// Key concepts:
// Properties of heap (max, min)
// Binary tree, complete binary tree and almost complete binary tree
// Leaf nodes of a binary tree - (n/2 -1) to n
// Non-leaf nodes of a binary tree - 0 to n/2
// Given an index, left node is i*2 +1, right node is i*2 + 2
// Given a node, parent node is (i/2)-1

const MaxHeap = require('./MaxHeap').MaxHeap;

let array = [
    { id: 1, priority: 1 },
    { id: 2, priority: 1 },
    { id: 3, priority: 2 },
    { id: 4, priority: 3 },
    { id: 5, priority: 1 }
];
let maxHeap = new MaxHeap(array, false, (a, b) => a.priority > b.priority);
console.log(maxHeap.getArray())

