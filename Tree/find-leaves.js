/**
 * Given a binary tree, collect a tree's nodes as if you were doing this: Collect and remove all leaves, repeat until the tree is empty.
Example:

Input: [1,2,3,4,5]
  
          1
         / \
        2   3
       / \     
      4   5    

Output: [[4,5,3],[2],[1]]
 
Explanation:

1. Removing the leaves [4,5,3] would result in this tree:

          1
         / 
        2          
 

2. Now removing the leaf [2] would result in this tree:

          1          
 

3. Now removing the leaf [1] would result in the empty tree:

          []         
[[3,5,4],[2],[1]], [[3,4,5],[2],[1]], etc, are also consider correct answers since per each level it doesn't matter the order on which elements are returned.
 */

const Node = require("./Tree").Node;
const BinaryTree = require("./Tree").BinaryTree;
const Queue = require('../Queue/Queue').Queue

var findLeaves = function(root) {
    const queue = new Queue();
    let temp = root, level = 0;
    const output = [];

    while(temp !== null){
        queue.enqueue({node: root,parent: null});
        while(!queue.isEmpty()){
            const queueNode = queue.dequeue();
            if(isLeafNode(queueNode.node)){
                addLeafNode(queueNode);
                if(queueNode.parent == null){
                    temp = null;
                    continue;
                }else{
                    removeLeafNode(queueNode);
                }
                
            }
            if(queueNode.node && queueNode.node.left !== null){
                queue.enqueue({node: queueNode.node.left, parent: queueNode.node,direction:'left'})
            }
            if(queueNode.node && queueNode.node.right !== null){
                queue.enqueue({node: queueNode.node.right, parent: queueNode.node,direction:'right'})
            }
        }
        level++;
    }
    
    
    function addLeafNode(queueNode){
        // add to output at level
        if(output.length === 0){
             output[level] = [];
        }
        if(output[level] == null){
            output[level] = [];
        }
        output[level].push(queueNode.node.value);   
    }
    
    function removeLeafNode(queueNode){
        const {direction,parent} = queueNode;
        switch(direction){
            case 'left':
                parent.left = null;
                break;
            case 'right':
                parent.right = null;
                break;
            default:
                // root node
                queueNode.node = null;
                break;
        }
    }
    
    return output;
};

function isLeafNode(node){
    return node.left === null && node.right === null
}

let tree = new BinaryTree();
tree.head = new Node(1);
tree.head.left = new Node(2);
tree.head.right = new Node(3);
tree.head.left.left = new Node(4);
tree.head.left.right = new Node(5);

console.log(findLeaves(tree.head));
console.log(Math.floor(1/2))