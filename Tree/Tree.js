const Queue = require('../Queue/Queue').Queue;
const Stack = require('../Stack/Stack').Stack;

class Node {
    constructor(value){
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinaryTree {
    constructor(){
        this.head = null;
    }
    
    doInorderTraversal(){
        let array = [];
        this.inOrderCore(this.head, array);
        return array;
    }

    inOrderCore(node, array){
        if(node == null){
            return;
        }
        this.inOrderCore(node.left);
        array.push(node.value);
        this.inOrderCore(node.right);
    }

    /**
     * This functions does a level order traversal of the binary tree
     * and returns the node's values
     */
    doLevelOrderTraversal(){
        // Holds the output values
        let array = [];
        // Queue to store each visited node
        const queue = new Queue();
        // Push the root node in the queue
        queue.enqueue(this.head);
        // Continue the logic till the queue is not empty at which point all the nodes
        // have been dequeued
        while(!queue.isEmpty()){
            // Remove the first node from the queue
            const node = queue.dequeue();
            array.push(node.value);
            // Add node's children to  the queue
            if(node.left != null){
                queue.enqueue(node.left);
            }
            if(node.right != null){
                queue.enqueue(node.right);
            }
        }
        return array;
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
    doZigZagTraversal(){
        let array = [];
        let currentLevel = new Stack();
        let nextLevel = new Stack();
        let leftToRight = true;
        currentLevel.push(this.head);
        while(!currentLevel.isEmpty()){
            const node = currentLevel.pop();
            array.push(node.value);
            if(leftToRight){
                if(node.left != null){
                    nextLevel.push(node.left)
                }
                if(node.right != null){
                    nextLevel.push(node.right)
                }
            }else{
                if(node.right != null){
                    nextLevel.push(node.right)
                }
                if(node.left != null){
                    nextLevel.push(node.left)
                }
            }
            if(currentLevel.isEmpty()){
                let temp = currentLevel;
                currentLevel = nextLevel;
                nextLevel = temp;
                leftToRight = !leftToRight;
            }
        }
        return array;
    }
    
}

let tree = new BinaryTree();
tree.head = new Node(10);
tree.head.left = new Node(8);
tree.head.right = new Node(2);
tree.head.left.left = new Node(3);
tree.head.left.right = new Node(5);
tree.head.right.left = new Node(6);
tree.head.right.right = new Node(7);
tree.head.left.left.left = new Node(9);


console.log(tree.doZigZagTraversal());


// Algo:
// 1. Do all basic traversals: inorder, preorder, postorder, level order, zigzag
// 2. Find if tree is BST
// 3. Get Left/Right view of a binary tree