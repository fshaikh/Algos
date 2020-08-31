/**
 Given two binary search trees root1 and root2.

Return a list containing all the integers from both trees sorted in ascending order.
 */

var getAllElements = function(root1, root2) {
    // do inorder traversals of tree1 and tree2
    // merge 2 sorted lists
    const list1 = [], list2 = [], mergedList = []; 
    let index1 = 0, index2 = 0;
    getNodes(root1,list1);
    getNodes(root2,list2);
    return merge();
    
    function getNodes(node,array){
        if(node == null){
            return;
        }
        getNodes(node.left,array);
        array.push(node.val);
        getNodes(node.right,array);
    }
    
    function merge(){
        while(index1 < list1.length && index2 < list2.length){
            if(list1[index1] <= list2[index2] ){
                mergedList.push(list1[index1])
                index1++;
            }else{
                mergedList.push(list2[index2]);
                index2++;
            }
        }
        
        const remaining = index1 < list1.length ?
                        list1.slice(index1):
                        list2.slice(index2)
        return mergedList.concat(remaining)
    }
};