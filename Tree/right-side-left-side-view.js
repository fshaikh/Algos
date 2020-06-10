/**
 * Given a bonary tree, print all the nodes that are visible when viewing tree from right/left side
 * 
 * Key insight:
 * Rightmost Node at each level  - Right View
 * Leftmost node at each level - Left View
 * BFS traversal. 
 */

var rightSideView = function(root) {
    if(root == null){
        return [];
    }
    const queue = [], map = new Map(), results = [];
    root.level = 0;
    queue.unshift(root);
    while(queue.length !== 0){
        const node = queue.shift();
        map.set(node.level,node.value);
        if(node.left != null){
            node.left.level = node.level + 1;
            queue.unshift(node.left);
        }
        if(node.right !== null){
            node.right.level = node.level + 1;
            queue.unshift(node.right);
        }
    }
    for(let [key,value] of map.entries()){
        results.push(value);
    }
    return results;
};

