/**
 * given two trees find if they are the same in both content and structure
 */

 /**
 * 
 * @param {*} node1 
 * @param {*} node2 
 */
function isSame(node1,node2){
    // structural check
    if(node1 == null && node2 == null){
        return true;
    }

    // structural check
    if( (node1 == null && node2 != null) ||
        (node2 == null && node1 != null)){
            return false;
    }

    // content check
    if(node1.value !== node2.value){
        return false;
    }

    // do it for the left subtree
    const l = isSame(node1.left,node2.left);
    if(!l){
        return false;
    }

    // do it for the right subtree
    const r = isSame(node1.right,node2.right);
    if(!r){
        return false;
    }
    return true;
}

/**
 * // naive way: O(2N) and O(2N)
 * @param {*} root1 - Root node of the first tree 
 * @param {*} root2 - Root node of the second tree
 */
function isSameNaive(root1,root2){
    
    // do pre order traversal starting from root1
    const values1 = [], values2 = [];
    getPreorderTraversal(root1,values1);
    // do pre order traversal starting from root 2
    getPreorderTraversal(root2,values2);
    // compare the 2 pre order traversals
    if(values1.length !== values2.length){
        return false;
    }
    for(let i=0;i<values1.length;i++){
        if(values1[i] !== values2[i]){
            return false;
        }
    }
    return true;
}

module.exports = {
    isSame,
    isSameNaive
};