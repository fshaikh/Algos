
var rangeSumBST = function(root, L, R) {
    let sum = 0;
     doRangeSumBSTCore(root,L,R, (value) => sum += value);
    return sum;
};

function doRangeSumBSTCore(node,L,R,callback){
    if(node == null){
        return;
    }

    if(node.val >= L && node.val <= R){        
        callback(node.val);
    }if(node.val > L){
         doRangeSumBSTCore(node.left,L,R,callback);
    }if(node.val < R){
         doRangeSumBSTCore(node.right,L,R,callback);
    }
}

class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.val = value;
    }
}

class BinaryTree {
    constructor() {
        this.head = null;
    }
}

let tree = new BinaryTree();
tree.head = new Node(10);
tree.head.left = new Node(5);
tree.head.right = new Node(15);
tree.head.left.left = new Node(3);
tree.head.left.right = new Node(7);
tree.head.right.right = new Node(18);

console.log(rangeSumBST(tree.head,7,15));