const BinaryTree = require('../Tree').BinaryTree;
const Node = require('../Tree').Node;


const constructBST = function(array){
    if(array == null || array.length === 0){
        return null;
    }
    const bst = new BinaryTree();
    bst.head = new Node(array[0]);
    for(let i=1;i<array.length;i++){
        insert(bst.head,array[i],bst.head,'');
    }
    return bst;
};

function insert(node,value,parent,direction){
    if(node == null){
        const node = new Node(value);
        if(direction === 'l'){
            parent.left = node;
        }else{
            parent.right = node;
        }
        return 1;
    }
    if(value <= node.value){
        const s = insert(node.left,value,node,'l');
        if(s){
            return 1;
        }
    }
    const ss = insert(node.right,value,node,'r');
    if(ss){
        return 1;
    }
}

const bst = constructBST([2,1,3,4]);
console.log(bst.doInorderTraversal());  // verify by doing an in order traversal. 