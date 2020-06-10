const Node = require('../Tree').Node;
const BinaryTree = require('../Tree').BinaryTree;
const BasicOperations = require('./basic-operations');

class BinarySearchTree extends BinaryTree{
    constructor(){
        super();
        this.head = null;
    }

    search(node){

    }

    insert(node){

    }

    /**
     * Deleting a node involves the following steps:
     * 1. Walk the BST from root till the node to be deleted is found
     * 2. If node not found, return head
     * 3. If node found:
     *      a. If node is a leaf node, set the parent's left or right to null. Select left or right based on where the node is appearing as a child
            b. If node has a right child, find its successor. Set node value to successor value. Delete successor node
            c. If node has a left child, find its predecessor. Set node value to predecessor value. Delete successor node
     * @param {*} node - Node to be deleted. If not present , return head
     */
    delete(nodeToDelete){
        const context = this;
        return deleteCore(this.head, nodeToDelete);
        // return this.head;
        //         8
        //      /    \
        //     4      12
        //    / \     / \
        //   3  7    11  13
        //  /  /
        // 2   6
        function deleteCore(node,nodeToDelete){
            if(node == null){
                return null;
            }
            if(nodeToDelete.value < node.value){
                node.left = deleteCore(node.left,nodeToDelete);
            }else if(nodeToDelete.value > node.value){
                node.right = deleteCore(node.right,nodeToDelete);
            }else{
                // If a leaf node, we can just return null
                if(context.isLeafNode(node)){
                    node = null;
                }
                // if node has a right child, find its successor as that will become the new value
                else if(node.right !== null){
                    const successor = BasicOperations.getSuccessor(context.head,node);
                    node.value = successor.value;
                    node.right = deleteCore(node.right, successor);
                }else{
                    // if node has a left child, find its predecessor as that will become the new value
                    const predecessor = BasicOperations.getPredecessor(context.head,node);
                    node.value = predecessor.value;
                    node.left = deleteCore(node.left, predecessor);
                }
                
            }
            return node;
        }
    }

    getSuccessor(node){
        return BasicOperations.getSuccessor(this.head,node);
    }

    getPredecessor(node){
        return BasicOperations.getPredecessor(this.head,node);
    }

    /**
     * Minimum value in a BST is always the left most node
     */
    getMinimumValue(){
        let temp = this.head;
        while(temp.left !== null){
            temp = temp.left;
        }
        return temp.value;
    }

    /**
     * Maximum value in a BST is always the rightmost node
     */
    getMaximumValue(){
        let temp = this.head;
        while(temp.right !== null){
            temp = temp.right;
        }
        return temp.value;
    }

    isLeafNode(node){
        return node.left == null && node.right == null;
    }
}

const tree = new BinarySearchTree();
tree.head = new Node(1);
// tree.head.left = new Node(4);
// tree.head.left.left = new Node(3);
// tree.head.left.right = new Node(7);
// tree.head.left.left.left = new Node(2);
// tree.head.left.right.left = new Node(6);
tree.head.right = new Node(2);
tree.head.right.right = new Node(3);
// tree.head.right.left = new Node(11);
// tree.head.right.right = new Node(13);

tree.delete(tree.head.right.right);
console.log(tree.doInorderTraversal());
