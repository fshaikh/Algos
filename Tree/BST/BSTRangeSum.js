const BinaryTree = require('../Tree').BinaryTree;
const Node = require('../Tree').Node;

var rangeSumBST = function(root, L, R) {
    if(root == null){
        return 0;
    }
    const set = [];
    let lIndex = 0;
    function visitNode(node,index){
            set.push(node);
            if(node === L){
                lIndex = index;
            }
    }
    doInorder(root,visitNode);
    let sum = 0;
    while(set[lIndex] <= R){
        sum += set[lIndex++];
    }
    return sum;
    
    // Time Complexity: O(logn)
    // Space complexity: O(N)
};

var rangeSumBSTFast = function(root,L,R){
    let sum = 0;
    if(!root){
        return sum;
    }
    return rangeSumBSTFastCore(root,L,R,sum);
}

function rangeSumBSTFastCore(node,L,R,sum){
    if(node == null){
        return sum;
    }
    if(node.value >= L && node.value <= R){
        sum += node.value;
    }
    if(node.value >= L){
        sum = rangeSumBSTFastCore(node.left,L,R,sum);
    }
    if(node.value <= R){
        sum = rangeSumBSTFastCore(node.right,L,R,sum);
    }
    return sum;
}


function doInorder(root,visitFn){
    let index = 0;
    doInorderCore(root,index,visitFn);
}

function doInorderCore(node,index,visitFn){
    if(node == null){
        return index;
    }
    index = doInorderCore(node.left,index,visitFn);
    visitFn(node.value,index);
    index++;
    index = doInorderCore(node.right,index,visitFn);
    return index;
}
function binarySearch(root,value,visitFn){
    return doBinarySearch(root,value,visitFn);
}

function doBinarySearch(node,value,visitFn){
    if(node == null){
        return false;
    }
    visitFn(node.value);
    if(node.value === value){
        return true;
    }
    if(value < node.value){
        return doBinarySearch(node.left,value,visitFn);
    }
    if(value > node.value){
        return doBinarySearch(node.right,value,visitFn);
    }
}

let tree = new BinaryTree();
const root = tree.head = new Node(18);
root.left = new Node(9);
root.right = new Node(27);
root.left.left = new Node(6);
root.left.right = new Node(15);
root.left.left.left = new Node(3);
root.left.right.left = new Node(12);
root.right.left = new Node(24);
root.right.left.left = new Node(21);
root.right.right = new Node(30);

// const root = tree.head = new Node(10);
// root.left = new Node(5);
// root.right = new Node(15);
// root.left.left = new Node(3);
// root.left.right = new Node(7);
// root.left.left.left = new Node(1);
// root.left.right.left = new Node(6);
// root.right.left = new Node(13);
// root.right.right = new Node(18);

console.log(rangeSumBSTFast(tree.head,18,24));