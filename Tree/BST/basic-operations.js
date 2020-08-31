/**
 * Consider a BST as shown below:
 *      8
     /    \
    4      12
   / \     / \
  3  7    11  13
 /  /
2   6
  
In-order traversal: [2,3,4,6,7,8,11,12,13]
Successor(4) = 6,  Successor(11) = 12, Successor(7) = 8
So a successor is the next node in the in-order traversal.

There are 2 ways to find successor of a node in BST. We are discarding the in-order traversal approach.
===================================================================================
METHOD 1: Using Parent Pointer
===================================================================================
In this method , each node has a parent pointer. This approach is expalined in CLRS

1. Handle the case when right is present
2. Walk up the tree

===================================================================================
METHOD 2: Using BST search
===================================================================================
1. Handle the case when right is present
2. Start from root and search down


Irrespective of the approach, one step is common across the two methods. I.E. Node has a right subtree
When the node has a right subtree, the approach is the same in both the methods.
When the node does not have a right subtree, we need to use different logic in each method

When node has right subtree:
1. Get the right of the node
2. Keep going to left till we encounter null
3. Return the last left node
For eg: To find successor of 4:
    1. Go to right (7)
    2. If right is present:
        2.1 Keep going to left till we get null (6). Thus successor of 4 is 6

 *      
 * @param {*} node 
 */

 //#region Successor
function getSuccessor(root,node){
    let successor = null;
    if(node.right){
        successor = getSuccessorWhenRightPresent(node);
    }else{
        // We are following Method 2 - Start search from root, since we do not store parent pointers.
        // Walk down from the root. every time node < root, successor is root
        let temp = root;
        while(temp != null){
            if(node.value < temp.value){
                successor = temp;
                temp = temp.left
            }else if(node.value > temp.value){
                temp = temp.right
            }else{
                break;
            }
        }        
    }
    
    return successor !== null ? successor : node;
}

function getSuccessorWhenRightPresent(node){
    let temp = node.right;
    while(temp.left != null){
        temp = temp.left;
    }
    return temp;
}
//#endregion Successor

//#region Predecessor
/**
 * *    8
     /    \
    4      14
   / \     / \
  3  7       18
 /  /
2   6
 * Predecessor is a mirror implementation of Successor.
 */
function getPredecessor(root,node){
    let predecessor = null
    if(node.left){
        predecessor = getPredessorWhenLeftPresent(node);
    }else{
        let temp = root;
        while(temp !== null){
            if(node.value < temp.value){
                temp = temp.left;
            }else if(node.value > temp.value){
                predecessor = temp;
                temp = temp.right;
                
            }else{
                break;
            }
        }
    }
    return predecessor;
}
function getPredessorWhenLeftPresent(node){
    let temp = node.left;
    while(temp.right !== null){
        temp = temp.right;
    }
    return temp;
}
//#endregion Successor

function getNodeSuccessor(root, node){
    if(node.right !== null){
        return getNodeSuccesorWhenRightPresent(node);
    }else{
        return getNodeSuccessorWhenRightNotPresent(root,node);
    }

    function getNodeSuccesorWhenRightPresent(node){
        let temp = node.right,successor;
        while(temp != null){
            temp = temp.left;
            successor = temp;
        }
        return successor;
    }

    function getNodeSuccessorWhenRightNotPresent(){
        let temp = root, successor;
        while(temp != null){
            if(temp.value > node.value){
                successor = temp;
                temp = temp.left;
            }else if(temp.value < node.value){
                temp = temp.right;
            }else{
                break;
            }
        }
        return successor;
    }
}
module.exports = {
    getSuccessor,
    getPredecessor
}
// const tree = new BinaryTree();
// tree.head = new Node(8);
// tree.head.left = new Node(4);
// tree.head.left.left = new Node(3);
// tree.head.left.right = new Node(7);
// tree.head.left.left.left = new Node(2);
// tree.head.left.right.left = new Node(6);
// tree.head.right = new Node(12);
// tree.head.right.left = new Node(11);
// tree.head.right.right = new Node(13);

// console.log(getPredecessor(tree.head, tree.head.left.right).value);
