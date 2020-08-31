/**
 * Given a binary tree and a sum, determine if the tree has a root-to-leaf path
 * such that adding up all the values along the path equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.
 */

 // #region Solution 1 - Slow
 /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if(root == null){
        return false
    }
    // get all the root-to-leaf paths
    function callback(pathSum){
        return sum === pathSum;
    }
    return getAllRootToLeafPaths(root,callback);
    // check each path sum
};

function getAllRootToLeafPaths(root,callback){
    let isPathFound = false;
    const map = new Map();
    const queue = new Queue();
    queue.enqueue(root);
    map.set(root,null);
    
    while(!queue.isEmpty()){
        const node = queue.dequeue();
        if(node.left == null && node.right == null){
            // we found leaf node, calculate the path
            const found = callback(getPathSum(map,node));
            isPathFound = found;
            if(found){
                break;
            }else{
                continue;
            }
        }
        if(node.left !== null){
            map.set(node.left, node);
            queue.enqueue(node.left);
        }
        if(node.right !== null){
            map.set(node.right, node);
            queue.enqueue(node.right);
        }
    }
    return isPathFound;
}

function getPathSum(map,node){
    let m = map.get(node);
    let sum = node.val;
    while(m !== null){
        sum += m.val;
        m = map.get(m);
    }

    return sum;
}
 // # endregion Solution 1 - Slow

 // # region Solution 2 - Recursive
 // Time Complexity - O(N)
 // Space complexity - O(N)
// Algo: Do a DFS traveral. When a leaf node is encountered, check the total. If same as sum, return true;

function hasPathWithSum(root, sum){
    return hasPathWithSumCore(root,sum,0)
}
function hasPathWithSumCore(node,sum,total){
    if(node == null){
        return;
    }
    total += node.value;
    if(node.left == null && node.right == null){
        return total === sum;
    }
    return hasPathWithSumCore(node.left,sum,total) || hasPathWithSumCore(node.right,sum,total);
}
 //#endregion Solution 2 - Recursive

//#region Fast Approach
 /**
  This problem is a variation of the above problem. Instead of returning a boolean, return count of all
  paths which add to a total
  */
 function getPathCountsWhichAddToSum(root,sum){
     let count = 0;
     function callback(){
        count++;
     }
     getPathCountsWhichAddToSumCore(root,sum,0, callback);
     return count;
 }

 function getPathCountsWhichAddToSumCore(node,sum,total,callback){
     if(node == null){
         return;
     }
     total += node.value;
     if(isLeafNode(node)){
         if(total === sum){
             callback();
         }
     }
     getPathCountsWhichAddToSumCore(node.left,sum,total,callback)
     getPathCountsWhichAddToSumCore(node.right,sum,total,callback)
 }
 //#endregion Fast Approach

 function isLeafNode(node){
     return node.left == null && node.right == null;
 }


 const Tree = require('./Tree').BinaryTree;
 const Node = require('./Tree').Node;

 const tree = new Tree();
 tree.head = new Node(5);
 tree.head.left = new Node(4);
 tree.head.right = new Node(8);
 tree.head.left.left = new Node(11);
 tree.head.left.left.left = new Node(2);
 tree.head.left.left.right = new Node(2);
 tree.head.right.left = new Node(9);
 tree.head.right.right = new Node(4);
 tree.head.right.right.right = new Node(1);
 console.log(getPathCountsWhichAddToSum(tree.head,22));