class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinaryTree {
    constructor() {
        this.head = null;
    }
}



const findCommonManager = (employee1, employee2, hierarchyList) => {
    // hierarchyList is an array where each item is 2 strings separated by space
    // we will form a binary tree and do the LCA algo
    const tree = buildBinaryTree(hierarchyList);
    const commonManager = getCommonManager(employee1, employee2, tree);
    return commonManager;
}

const buildBinaryTree = (hierarchyList) => {
   const adjacencyList = buildAdjacencyList(hierarchyList);
   // first build the root and its children
   const tree = new BinaryTree();
   const entries = adjacencyList.entries();
   for (const iterator of entries) {
       if(tree.head == null){
           tree.head = new Node(iterator[0]);
           tree.head.left = new Node(iterator[1][0]);
           tree.head.right = new Node(iterator[1][1]);
       }else{
           const node = getNode(tree.head,iterator[0]);
           if(node!= null){
               node.left = new Node(iterator[1][0]);
               node.right = new Node(iterator[1][1]);
           }
       }
   }
   return tree;
}

const getCommonManager = (employee1, employee2, tree) =>{
    const employee1Path = getEmployeePath(tree.head,employee1);
    const employee2Path = getEmployeePath(tree.head,employee2);
    let commonManager = '';
    for(let i=0;i<employee1Path.length;i++){
        if(employee1Path[i] === employee2Path[i]){
            commonManager = employee1Path[i];
            continue;
        }
        break;
    }
    return commonManager
};

const buildAdjacencyList = (hierarchyList) => {
    const adjacencyList = new Map();
    hierarchyList.forEach((hierarchy)=>{
        const employees = hierarchy.split(' ');
        if(!adjacencyList.has(employees[0])){
            adjacencyList.set(employees[0],[employees[1]]);
        }else{
            let array = adjacencyList.get(employees[0])
            array.push(employees[1]);
            adjacencyList.set(employees[0],array)
        }
    });
    return adjacencyList;
};

const getNode = (head,key) => {
    return getNodeCore(head,key);
}

const getNodeCore = (root,key) => {
    if(root == null){
        return;
    }
    if(root.value === key){
        return root;
    }
    let node = getNodeCore(root.left,key);
    if(node != null)
    {
        return node;
    }
    node = getNodeCore(root.right,key);
    if(node != null)
    {
        return node;
    }
}

const getEmployeePath = (root,value) => {
    let array = [];
    getEmployeePathCore(root,value,array);
    return array;
}

const getEmployeePathCore = (node,value,array) => {
    if(node == null){
        return;
    }
    array.push(node.value);
    if(node.value === value){
        return 1;
    }
    let status = getEmployeePathCore(node.left,value,array);
    if(status){
        return 1;
    }
    status = getEmployeePathCore(node.right,value,array);
    if(status){
        return 1;
    }
}

console.log(findCommonManager('Hilary', 'James',['Sarah Fred','Sarah Paul','Fred Hilary','Fred Jenny','Jenny James']))