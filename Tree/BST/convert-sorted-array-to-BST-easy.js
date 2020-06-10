const Node = require('../Tree').Node;

var sortedArrayToBST = function(nums) {
    const head = constructBST(0,nums.length - 1);
    return head;
    
    function constructBST(startIndex,endIndex){
        // base condition
        if(startIndex > endIndex){
            return;
        }
        
        let mid = Math.floor((startIndex + endIndex) / 2);
        const node = new Node(nums[mid]);

        // left
        node.left = constructBST(startIndex, mid - 1);
        // right
        node.right = constructBST(mid + 1, endIndex);

        return node;
    }
};

const head = sortedArrayToBST([-10,-3,0,5,9]);

const results = [];
function inorder(node){
    if(node == null){
        return;
    }
    inorder(node.left)
    results.push(node.value);
    inorder(node.right);
}
inorder(head);
console.log(results)