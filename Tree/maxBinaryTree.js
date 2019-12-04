const BinaryTree = require('./Tree').BinaryTree;
const Node = require('./Tree').Node;

const constructMaximumBinaryTree = function (array) {
    if (array == null || array.length === 0) {
        return null;
    }
    const maxBinaryTree = new BinaryTree();
    if (array.length === 1) {
        maxBinaryTree.head = new Node(array[0]);
        return maxBinaryTree;
    }

    // add node for the maximum element
    const maxIndex = getMaximum(array);
    maxBinaryTree.head = new Node(array[maxIndex]);
    constructMaximumBinaryTreeCore(maxBinaryTree.head, array.slice(0, maxIndex), array.slice(maxIndex + 1, array.length));

    return maxBinaryTree;
};


function constructMaximumBinaryTreeCore(node, left, right) {
    if(node == null){
        return;
    }
    let leftMax = -1, rightMax = -1;
    // find and add the maximum in the left
    if (left.length != 0) {
        leftMax = getMaximum(left);
        node.left = new Node(left[leftMax]);
    }
    // find and add the maximum in the right
    if (right.length !== 0) {
        rightMax = getMaximum(right);
        node.right = new Node(right[rightMax]);
    }
    constructMaximumBinaryTreeCore(node.left, leftMax <= 0 ? [] : left.slice(0, leftMax), left.slice(leftMax + 1, left.length));
    constructMaximumBinaryTreeCore(node.right, rightMax <= 0 ? [] : right.slice(0, rightMax), right.slice(rightMax + 1, right.length));
}

function getMaximum(array) {
    let max = Number.NEGATIVE_INFINITY;
    let maxIndex = 0;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element > max) {
            max = element;
            maxIndex = index;
        }
    }
    return maxIndex;
}

// const maxBT = constructMaximumBinaryTree([3, 2, 1, 6, 0, 5]);
// console.log(maxBT.head);

const maxBT1 = constructMaximumBinaryTree([1,2,8,4,5,6]);
