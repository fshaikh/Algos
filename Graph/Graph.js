const Queue = require('../Queue/Queue').Queue;
/**
 * Graph representation using adjacent list
 */
 class Graph {
     /**
      * Initializes a new instance of Graph
      */
     constructor(){
         // Represents an adjacency list
         this._adjacentList = new Map();
     }

     /**
      * Adds a new vertex to graph
      * @param {*} vertex 
      */
     addVertex(vertex){
         this._adjacentList.set(vertex,[]);
     }

     /**
      * Adds an edge connecting passed v1 and v2 vertices
      * @param {*} v1 
      * @param {*} v2 
      */
     addEdge(v1,v2){
        this._adjacentList.get(v1).push(v2);
     }

     getGraph(){
         return this._adjacentList;
     }

     /**
      * Breadth-first traversal of graph
      */
     doBFS(){
         // Stores the graph vertices in BFS traversal order
        let bfsNodes = [];
        // Keeps the list of visited nodes to avoid duplicates and cycle
        const visited = new Set();
        // Queue to hold the adjacent nodes ofa vertex
        const queue = new Queue();
        // Enqueue the first vertex in the queue
        for (var key of this._adjacentList.keys()) {
            queue.enqueue(key);
            visited.add(key);
            break;
          }
        
         // while a queue is not empty
        while(!queue.isEmpty()){
            // dequeue a node
            const node = queue.dequeue();
            // Push to the output array
            bfsNodes.push(node);
            // get its children and put on queue
            this._adjacentList.get(node).forEach(adjacentNode => {
                // Enqueue only if node has not been visited before
                if(!visited.has(adjacentNode)){
                    queue.enqueue(adjacentNode);
                    // Add to visited set
                    visited.add(adjacentNode);
                }
                
            });
        }
        return bfsNodes;
     }

     /**
      * Depth-first traveral of graph
      */
     doDFS(){
        let dfsNodes = [];
        let visited = new Set();
        for (const key of this._adjacentList.keys()) {
            this.doDFSCore(key,dfsNodes,visited);
        }
        return dfsNodes;
     }

     doDFSCore(key,dfsNodes,visited){
         if(visited.has(key)){
             return;
         }
         dfsNodes.push(key);
         visited.add(key);
         const adjacentNodes = this._adjacentList.get(key);
         for(let i=0;i<adjacentNodes.length;i++){
             this.doDFSCore(adjacentNodes[i],dfsNodes,visited);
         }
     }
 }

 const graph = new Graph();
 graph.addVertex(1);
 graph.addVertex(2);
 graph.addVertex(3);
 graph.addVertex(4);
 graph.addVertex(5);
 graph.addVertex(6);
 graph.addVertex(7);
 graph.addVertex(8);
 graph.addVertex(9);
 graph.addVertex(10);

 graph.addEdge(1,2);
 graph.addEdge(1,4);

 graph.addEdge(2,3);
 graph.addEdge(2,5);
 graph.addEdge(2,7);
 graph.addEdge(2,8);

 graph.addEdge(3,10);
 graph.addEdge(3,9);

 graph.addEdge(4,1);
 graph.addEdge(4,3);
 
 graph.addEdge(5,2);
 graph.addEdge(5,6);
 graph.addEdge(5,8);
 graph.addEdge(5,7);
 graph.addEdge(6,5);
 graph.addEdge(7,2);
 graph.addEdge(7,5);
 graph.addEdge(7,8);
 graph.addEdge(8,2);
 graph.addEdge(8,5);
 graph.addEdge(8,7);

console.log(graph.doDFS());