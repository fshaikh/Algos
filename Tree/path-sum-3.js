/**
You are given a binary tree in which each node contains an integer value.

Find the number of paths that sum to a given value.

The path does not need to start or end at the root or a leaf, 
but it must go downwards (traveling only from parent nodes to child nodes).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

Example:

root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

Return 3. The paths that sum to 8 are:

1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11
 */

 /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
//#region O(N2)
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
    let count = 0;
    function callback(c){
        count += c;
    }
    pathSumCore(root,sum,[],callback)
    return count;
};

function pathSumCore(node,sum,totals,callback){
    if(node == null){
        return;
    }
     let count = 0;
    totals = totals.map(total => {
        const t = total + node.val;
        if(t === sum){
            count++
        }
        return t;
    });
    totals.push(node.val);
    if(node.val === sum){
        count++;
    }
    if(count > 0){
        callback(count);
    }
    
    pathSumCore(node.left,sum,totals,callback)
    pathSumCore(node.right,sum,totals,callback)
    
}
//#endregion O(N2)

