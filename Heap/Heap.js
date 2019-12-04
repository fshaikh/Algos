//References:
// https://www.youtube.com/watch?v=40iljMQmqmY
// https://www.youtube.com/watch?v=2fA1FdxNqiE
// https://www.youtube.com/watch?v=HI97KDV23Ig

// Key concepts:
// Properties of heap (max, min)
// Binary tree, complete binary tree and almost complete binary tree




// Heap is an almost complete binary tree (may or may not be complete)
//      1
//    2    3
// 4
// Max-heap . Root must always be maximum for every sub-tree
// Min-heap.  Root must always be minimum for every sub-tree
// Mental model is a almost complete binary tree but memory model used is array.
// Any complete binary tree can be stored inside an array using the below :
        // Root is always placed at first index of the array
        // Given an root index, left node is i*2 +1, right node is i*2 + 2
        // Given a node, parent node is (i/2)-1
        // Height of a node: number of edges from node to the leaf which is the farthest
        // Height of a heap: logN
        // Leaf nodes of a binary tree = (n/2 + 1) to n
        // Non-leaf nodes of a binary tree - 0 to n/2
// Understand 2 operations:
//    Given a min/max heap, return an array representation.
//          Start from the root. Place root at index 0. Assume root index starts at 1
//          Get the left and right nodes of root using (i*2) and (i*2 + 1). Place at index 2 and 3
//          Keep doing above steps

//    Given an array, determine if its a max heap or not
//      [25, 12, 16, 13, 10 , 8, 14]    

// Heapify an array
// 1. Create a binary tree from the given array using the rules for finding the left/right child for a node
// 2. Each leaf node is a min/max heap already. So look for the non-leaf node with the largest index. 
//      leaf nodes: (n/2 + 1) to n, non-leaf nodes: n/2 to 1
// 3. Make that subtree which consists of non-leaf node as a root to min/max heap
// 4. Do 3 for each non-leaf node (from n/2 to 1)
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

