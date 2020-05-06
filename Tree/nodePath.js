/**
 * Given a binary tree, return path of a node from root to the node
 */
class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }


}

class BinaryTree{
    constructor(){
        this.head = null;
    }

    getNodePath(nodeValue){
        const path = [];
        this.getNodePathCore(this.head,path,nodeValue)
        return path;
    }

    getNodePathCore(node,path,target){
        if(node == null){
            return;
        }
        path.push(node.value);
        if(node.value === target){
            return true;
        }
        let status = this.getNodePathCore(node.left,path,target);
        if(status){
            return true;
        }
        status = this.getNodePathCore(node.right,path,target);
        if(status){
            return true;
        }
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

console.log(tree.getNodePath(5))
console.log(tree.getNodePath(3))