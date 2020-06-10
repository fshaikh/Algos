const Queue = require('../Queue/Queue').Queue;
const Stack = require('../Stack/Stack').Stack;
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

     addVertexAndEdge(v1,v2){
         if(!this._adjacentList.has(v1)){
             this._adjacentList.set(v1,[v2])
         }else{
             this.addEdge(v1,v2)
         }
         if(!this._adjacentList.has(v2)){
            this._adjacentList.set(v2,[])
        }
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

     doDFSIterative() {
        const stack = new Stack();
        const visited = new Set();
        let dfsNodes = [];
        for (var key of this._adjacentList.keys()) {
            stack.push(key);
            visited.add(key);
            break;
        }
        while(!stack.isEmpty()){
            const v = stack.peek();
            stack.pop();
            const adjacentVertices = this._adjacentList.get(v);
            adjacentVertices.forEach(adjV => {
                if(!visited.has(adjV)){
                    visited.add(adjV);
                    stack.push(adjV)
                }
            });
            dfsNodes.push(v);
        }
        return dfsNodes;
    }

     //#region Topological Sort

     //#region DFS-based Approach
     doTopologicalSort(){
         let topologicalOrder = [];
         const visited = new Set();
         for (const key of this._adjacentList.keys()){
            this.doTopologicalSortCore(key,visited, (vertex) => topologicalOrder.unshift(vertex));
         }
         return topologicalOrder;
     }

     doTopologicalSortCore(vertex, visited, postVisitCallback){
         if(visited.has(vertex)){
             return;
         }
         // pre-visit
         visited.add(vertex);
         //visit
         const adjacentList = this._adjacentList.get(vertex);
         for(let i=0;i<adjacentList.length;i++){
             this.doTopologicalSortCore(adjacentList[i],visited,postVisitCallback);
         }
         postVisitCallback(vertex);
     }
     //#endregion DFS-based Approach

     //#region Kahn algorithm
     // Pre-reqs: 
     //    DAG must have the following 2 properties: 
     //         Must have least 1 vertex with incoming degree 0 and 
     //         Must have least 1 vertex with outgoing degree as 0
     //    If not, DAG has a cycle. This can be used as one of the algos for finding if DAG has cycle

     // 1. Compute incoming degree for all vertex
     // 2. Add all vertex with incoming degree 0 to queue
     // 3. If queue is empty, topological sort cannot be computed as there is a cycle, return
     // 3. while queue is not empty
     //     dequeue from queue. Add to result array
     //     Decrement incoming degree for all vertex which have this vertex as neighbour
     //     If decrement makes incoming degree as 0 for any vertex, add to queue
     // 4. If queue is not empty, topological sort cannot be done, return
     // 5. Return result array which contains topological ordering of the graph
     doTopologicalSortUsingKahn(){
        const incomingDegreeMap = this.getIncomingDegreeForEachVertex();
        const queue = new Queue();
        const topologicalOrdering = [];
        for (const iterator of incomingDegreeMap) {
            if(iterator[1] === 0){
                queue.enqueue(iterator[0])
            }
        }
        if(queue.isEmpty()){
            return topologicalOrdering;
        }
        
        while(!queue.isEmpty()){
            const vertex = queue.dequeue();
            topologicalOrdering.push(vertex);
            const adjacentList = this._adjacentList.get(vertex);
            adjacentList.forEach(element => {
                const incomingDegree = incomingDegreeMap.get(element) - 1;
                incomingDegreeMap.set(element,incomingDegree);
                if(incomingDegree === 0){
                    queue.enqueue(element)
                }
            });
        }
        // if there is still any incoming degree greater than 1, there is a cycle
        for (const iterator of incomingDegreeMap) {
            if(iterator[1] !== 0){
                return [];
            }
        }
        return topologicalOrdering;
     }
     //#endregion Kahn algorithm
     //#endregion Topological Sort

     /**
      * Computes incoming degree for each vertex of the graph. Incoming degree is the number of incoming edges to a vertex
      * This is an useful sub-problem in many other graph algorithms. For eg: Kahn's algorithm, etc
      * Returns - Map where key = vertex, value = incoming degree
      */
     getIncomingDegreeForEachVertex(){
        let incomingDegree = new Map();
        for (const key of this._adjacentList.keys()) {
            incomingDegree.set(key,0)
        }
        for (const key of this._adjacentList.keys()) {
            const adjacentNodes = this._adjacentList.get(key);
            for (let index = 0; index < adjacentNodes.length; index++) {
                const element = adjacentNodes[index];
                const currentIncomingDegree = incomingDegree.get(element) + 1;
                incomingDegree.set(element,currentIncomingDegree);
            }
        }
        return incomingDegree;
     }
 }

 module.exports = {
     Graph: Graph
 }

 const graph = new Graph();
//  graph.addVertex('t');
//  graph.addVertex('f');
//  graph.addVertex('w');
//  graph.addVertex('e');
//  graph.addVertex('r');
//  graph.addEdge('e','r');
//  graph.addEdge('r','t');
//  graph.addEdge('w','e');
//  graph.addEdge('t','f');
//  graph.addVertex(1);
//  graph.addVertex(2);
//  graph.addVertex(3);
//  graph.addVertex(4);
//  graph.addVertex(5);
//  graph.addVertex(6);
//  graph.addVertex(7);
//  graph.addVertex(8);
//  graph.addVertex(9);
//  graph.addVertex(10);

//  graph.addEdge(1,2);
//  graph.addEdge(1,4);

//  graph.addEdge(2,3);
//  graph.addEdge(2,5);
//  graph.addEdge(2,7);
//  graph.addEdge(2,8);

//  graph.addEdge(3,10);
//  graph.addEdge(3,9);

//  graph.addEdge(4,1);
//  graph.addEdge(4,3);
 
//  graph.addEdge(5,2);
//  graph.addEdge(5,6);
//  graph.addEdge(5,8);
//  graph.addEdge(5,7);
//  graph.addEdge(6,5);
//  graph.addEdge(7,2);
//  graph.addEdge(7,5);
//  graph.addEdge(7,8);
//  graph.addEdge(8,2);
//  graph.addEdge(8,5);
//  graph.addEdge(8,7);
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('A', 'D');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
console.log(graph.doDFSIterative());
// console.log(graph.doTopologicalSort());
// console.log(graph.doTopologicalSortUsingKahn());