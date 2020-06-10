
/**
 * Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    if(node == null || node.length === 0){
        return node;
    }
    const queue = new Queue();
    const visited = new Map();
    visited.set(node, new Node(node.val,[]))
    queue.enqueue(node);
    
    while(!queue.isEmpty()){
        const v = queue.dequeue();
        const neighbors = v.neighbors;
        neighbors.forEach(neighbor => {
            if(!visited.has(neighbor)){
                visited.set(neighbor, new Node(neighbor.val,[]));
                queue.enqueue(neighbor)
            }
            visited.get(v).neighbors.push(visited.get(neighbor))
        });
    }

    return visited.get(node);
};

class Queue {
    constructor(){
        this._storage = [];
    }

    enqueue(value){
        this._storage.push(value);
    }

    dequeue(){
        if(this._storage.length === 0){
            return null;
        }
        const value = this._storage[0];
        this._storage.splice(0,1);
        return value;
    }

    isEmpty(){
        return this._storage.length === 0;
    }
}