const Node = require('../Tree').Node;
const BinaryTree = require('../Tree').BinaryTree;
const Stack = require('../../Stack/Stack').Stack;

var kthSmallest = function(root, k) {
    const stack = new Stack();
    let temp = root;
    while(temp != null || !stack.isEmpty()){
        while(temp != null){
            stack.push(temp);
            temp = temp.left;
        }
        const node = stack.pop();
        if(--k === 0){
            return node.value
        }
        temp = node.right;
    }
};

let tree = new BinaryTree();
tree.head = new Node(10);
tree.head.left = new Node(5);
tree.head.right = new Node(15);
tree.head.left.left = new Node(3);
tree.head.left.right = new Node(7);
tree.head.right.right = new Node(18);

console.log(kthSmallest(tree.head,4));
