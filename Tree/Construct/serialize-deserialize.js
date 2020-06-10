/**
 * Serialize to a string array using pre-order traversal. The only difference is to preserve null nodes as well
 * @param {\} root 
 */
const Node = require('../Tree').Node;
const BinaryTree = require('../Tree').BinaryTree;

function serialize(root){
    const serializedArray = [];
    function preOrder(node){
        if(node == null){
            serializedArray.push(null);
            return;
        }
        serializedArray.push(node.value);
        preOrder(node.left);
        preOrder(node.right);
    }
    preOrder(root);
    return serializedArray;
}

/**
 * Since serialized array stores nodes in order, we can just create node. go to the next item and set left and right
 * @param {*} serializedTreeArray 
 */
function deserialize(serializedTreeArray){
    let index = 0;
    return deserializeCore();
    function deserializeCore(){
        if(serializedTreeArray[index] == null){
            index++
            return null;
        }
        const node = new Node(serializedTreeArray[index++]);
        node.left = deserializeCore(node.left);
        node.right = deserializeCore(node.right);

        return node;
    }
}

const bt = new BinaryTree();
bt.head = new Node(1);
const head = bt.head;
head.left = new Node(2);
head.right = new Node(5);
head.left.left = new Node(3);
head.left.right = new Node(4);

const serializedTree = serialize(head);
const root = deserialize(serializedTree);
console.log(serialize(root));
// [ 1, 2, 3, null, null, 4, null, null, 5, null, null ]

// node 1


