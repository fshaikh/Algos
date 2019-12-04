const Queue = require('../Queue/Queue').Queue;
const Stack = require('../Stack/Stack').Stack;

const SCCAlgo = {
    Kosaraju: 1,
    Tarjan: 2,
    PathBased: 3
};
/**
 * Graph representation using adjacent list
 */
class Graph {
    /**
     * Initializes a new instance of Graph
     */
    constructor() {
        // Represents an adjacency list
        this._adjacentList = new Map();
    }

    /**
     * Adds a new vertex to graph
     * @param {*} vertex 
     */
    addVertex(vertex) {
        this._adjacentList.set(vertex, []);
    }

    /**
     * Adds an edge connecting passed v1 and v2 vertices
     * @param {*} v1 
     * @param {*} v2 
     */
    addEdge(sourceVertex, targetVertex) {
        // if source vertex is not present in the grasph first add it
        const isSourcePresent = this.isSourceVertexAvailable(sourceVertex);
        if (!isSourcePresent) {
            this.addVertex(sourceVertex);
        }
        const isTargetPresent = this.isSourceVertexAvailable(targetVertex);
        if (!isTargetPresent) {
            this.addVertex(targetVertex);
        }
        this._adjacentList.get(sourceVertex).push(targetVertex);
    }

    removeEdge(sourceVertex, targetVertex) {
        const vertices = this._adjacentList.get(sourceVertex);
        const index = vertices.indexOf(targetVertex);
        vertices.splice(index, 1);
    }

    isSourceVertexAvailable(sourceVertex) {
        return this._adjacentList.has(sourceVertex);
    }

    getAdjacentList() {
        return this._adjacentList;
    }

    getGraph() {
        return this._adjacentList;
    }

    getVerticesCount() {
        return this._adjacentList.length;
    }

    getVertex(vertex){
        return this._adjacentList.get(vertex);
    }

    getIndegreeVertices(sourceVertex){
        const indegreeVertices = [];
        for (const vertex of this._adjacentList.keys()) {
            if (sourceVertex !== vertex) {
                if (this._adjacentList.get(vertex).includes(sourceVertex)) {
                    indegreeVertices.push(vertex)
                }
            }
        }
        return indegreeVertices;
    }

    // #region BFS
    doBFS() {
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
        while (!queue.isEmpty()) {
            // dequeue a node
            const node = queue.dequeue();
            // Push to the output array
            bfsNodes.push(node);
            // get its children and put on queue
            this._adjacentList.get(node).forEach(adjacentNode => {
                // Enqueue only if node has not been visited before
                if (!visited.has(adjacentNode)) {
                    queue.enqueue(adjacentNode);
                    // Add to visited set
                    visited.add(adjacentNode);
                }

            });
        }
        return bfsNodes;
    }

    /**
     * Given an undirected graph with equal weight for all the edges and a source vertex,
     * determine the shortest distance from source vertex to all the reachable vertices.
     * For vertices which are unreachable, set the distance as -1
     * @param {*} sourceVertex 
     * @param {*} edgeWeight 
     */
    getVertexDistances(sourceVertex,edgeWeight){
        const visited = new Set();
        const level = [];
        const vertexDistances = new Map();
        const queue = new Queue();

        // initialize all distances as unreachable  -1
        for (const [key] of this.getAdjacentList().entries()) {
            if(key === sourceVertex){
                continue;
            }
                vertexDistances.set(key,-1);
        }

        // add the source vertex to the queue
        queue.enqueue(sourceVertex);
        visited.add(sourceVertex);
        level[sourceVertex] = 0;
         
        while(!queue.isEmpty()){
            const vertex = queue.dequeue();
            const adjacentVertices = this.getAdjacentList().get(vertex);
            for (let index = 0; index < adjacentVertices.length; index++) {
                const adjacentVertex = adjacentVertices[index];
                if(visited.has(adjacentVertex)){
                    continue;
                }
                visited.add(adjacentVertex);
                const vertexLevel = level[vertex] + 1;
                level[adjacentVertex] = vertexLevel;
                vertexDistances.set(adjacentVertex,vertexLevel*edgeWeight);
                queue.enqueue(adjacentVertex);
            }
        }

        return Array.from(vertexDistances.values());
    }
    //#endregion BFS

    // #region DFS
    /**
     * Depth-first traveral of graph
     * Time Complexity: O(V + E)
     * How:  In DFS, you visit each node. So O(V). 
     * Adjacency List Representation: Since each vertex stores a list of adjacent vertices, traverse list once. O(E). O(V) + O(E) = O(V + E)
     * 
     */
    doDFS() {
        let dfsNodes = [];
        let visited = new Set();
        // Stores pre and post visit number for each vertex
        let prePost = new Map();
        let count = 1;
        for (const key of this._adjacentList.keys()) {
            count = this.doDFSCore(key, dfsNodes, visited, prePost, count);
        }

        return dfsNodes;
    }

    doDFSCore(key, dfsNodes, visited, prePost, count) {
        if (visited.has(key)) {
            return count;
        }
        dfsNodes.push(key);
        // Set previsit count for the vertex
        prePost.set(key, [count++]);
        visited.add(key);
        const adjacentNodes = this._adjacentList.get(key);
        for (let i = 0; i < adjacentNodes.length; i++) {
            count = this.doDFSCore(adjacentNodes[i], dfsNodes, visited, prePost, count);
        }
        // Set postvisit count for the vertex
        const prePostArray = prePost.get(key);
        prePostArray.push(count++);
        prePost.set(key, prePostArray);
        return count;
    }

    /**
     * Iterative implementation of DFS using Stack
     */
    doDFSIterative() {
        const stack = new Stack();
        const visited = new Set();
        let dfsNodes = [];
        for (const key of this._adjacentList.keys()) {
            stack.push(key);
            visited.add(key);
            break;
        }
        while (!stack.isEmpty()) {
            const node = stack.peek();
            const adjacentNodes = this._adjacentList.get(node);
            for (let index = 0; index < adjacentNodes.length; index++) {
                const element = adjacentNodes[index];
                if (visited.has(element)) {
                    continue;
                }
                visited.add(element);
                stack.push(element);
                break;
            }
            dfsNodes.push(stack.pop());
        }
        return dfsNodes;
    }
    //#endregion DFS

    getShortestPath(start, end) {
        // Stores the graph vertices in BFS traversal order
        const path = new Map();
        // Keeps the list of visited nodes to avoid duplicates and cycle
        const visited = new Set();
        // Queue to hold the adjacent nodes ofa vertex
        const queue = new Queue();
        const shortestPath = [];

        queue.enqueue(start);
        visited.add(start);
        path.set(start, null);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            if (node === end) {
                // found the end node
                // reconstruct the path


                // 1. Find the end node in the path map
                // 2. Start navigating backward
                shortestPath.push(end);
                let refNode = end;
                while (path.get(refNode) !== start) {
                    shortestPath.push(path.get(refNode));
                    refNode = path.get(refNode);
                }
                shortestPath.push(start);
                return shortestPath.reverse();
            }
            this._adjacentList.get(node).forEach((adjacentNode) => {
                if (!visited.has(adjacentNode)) {
                    queue.enqueue(adjacentNode);
                    visited.add(adjacentNode);

                    path.set(adjacentNode, node);
                }
            });
        }
        if (shortestPath.length === 0) {
            return [];
        }
    }

    /**
     * Determines if a path exists between a given pair of vertices
     * @param {*} sourceVertex 
     * @param {*} targetVertex 
     */
    isPathExists(sourceVertex,targetVertex){
        const visited = new Set();
        let isPathExists = this.isPathExistsCore(sourceVertex,targetVertex,visited,false);
        return isPathExists === undefined ? false: true;
    }

    isPathExistsCore(vertex,targetVertex,visited,pathFound){
        if(vertex === targetVertex){
            return true;
        }
        // pre-visit
        if(visited.has(vertex)){
            return;
        }
        visited.add(vertex);
        const adjacentVertices = this._adjacentList.get(vertex);
        for (let index = 0; index < adjacentVertices.length; index++) {
            const adjacentVertex = adjacentVertices[index];
            if(this.isPathExistsCore(adjacentVertex,targetVertex,visited,pathFound)){
                return true;
            }
        }
        // post-visit
    }


    //#region Topological Sort

    // #region DFS- Approach
    doTopologicalSort() {
        // Stores the visited nodes
        let visited = new Set();
        // Stores the node which have either no adjacent nodes or has been completely visited DFS-wise
        let stack = new Stack();
        // Stores the result
        let topologicalOrder = [];
        // Start navigating the vertices.
        for (const key of this._adjacentList.keys()) {
            // Call the recursive function which does the actual sorting
            this._doTopologicalSortCore(key, visited, stack);
        }
        for (let item of stack) {
            topologicalOrder.push(item);
        }
        return topologicalOrder;
    }

    _doTopologicalSortCore(key, visited, stack) {
        // If the node has been already visited, return from the recursive function
        if (visited.has(key)) {
            return;
        }
        // Add the node to the visited set
        visited.add(key);
        // Get the adjacent nodes
        const neighbours = this._adjacentList.get(key);
        // Since this is DFS, start doing traversal of each adjacent node
        for (let index = 0; index < neighbours.length; index++) {
            this._doTopologicalSortCore(neighbours[index], visited, stack);
        }
        // THIS IS THE KEY DIFFERENCE IN TS: Once DFS is done on a node, push to the stack
        // This is the post-visit phase of DFS for a node
        stack.push(key);
    }
    // #endregion DFS Approach

    // #region Kahn's Algorithm
    doToplogicalSortUsingKahn() {
        // Get the indegree of all vertices
        const indegreeMap = this.getIndegreeForGraph();
        // 1. Find all vertices with 0 indegree
        const verticesWithZeroInDegree = this.getVertexWithZeroIndegree(indegreeMap);
        // Stores the topological order of DAG
        const topologicalOrder = [];

        // Do while the set has at least one element
        while (verticesWithZeroInDegree.length > 0) {
            const vertex = verticesWithZeroInDegree.pop();
            topologicalOrder.push(vertex);

            const adjacentVertices = this._adjacentList.get(vertex);
            if(!adjacentVertices){
                continue;
            }
            for (const adjacentVertex of adjacentVertices) {
                let currentIndegree = indegreeMap.get(adjacentVertex);
                 --currentIndegree;
                 indegreeMap.set(adjacentVertex,currentIndegree);
                 if(currentIndegree === 0){
                    verticesWithZeroInDegree.push(adjacentVertex);
                }
            }
        }
        return topologicalOrder;
    }
    // #endregion Kahn's Algorithm
    //#endregion Topological Sort
    // #region All paths using DFS
    /**
     * Given a source vertex and destination vertex, returns all the paths from source to destination
     * Graph is a DG. Assumes that at least one path exists
     * @param {*} source - Source vertex
     * @param {*} destination - Destination Vertex
     */
    getAllPathsDFS(source, destination) {
        let paths = [];
        let currentPath = new Map();
        let visited = new Set();
        currentPath.set(source, source);
        visited.add(source);
        this._getAllPathsDFSCore(source, destination, currentPath, paths, visited);
        return paths;
    }

    _getAllPathsDFSCore(node, destination, currentPath, paths, visited) {
        if (node === destination) {
            paths.push(this._getPathArray(currentPath));
            return;
        }
        const adjacentNodes = this._adjacentList.get(node);
        for (let index = 0; index < adjacentNodes.length; index++) {
            const element = adjacentNodes[index];
            if (visited.has(element)) {
                continue;
            }
            visited.add(element);
            currentPath.set(element, element);
            this._getAllPathsDFSCore(element, destination, currentPath, paths, visited);
            currentPath.delete(element);
            visited.delete(element)
        }
    }

    _getPathArray(currentPathMap) {
        const p = [];
        for (const iterator of currentPathMap.keys()) {
            p.push(iterator);
        }
        return p;
    }
    //#endregion All paths using DFS
    // #region Get count of all paths between 2 vertices of a DAG.
    getPathCount(source, destination) {
        let pathCount = 0;
        pathCount = this._getPathCountCore(source, destination, pathCount);
        return pathCount;
    }

    _getPathCountCore(node, destination, pathCount) {
        if (node === destination) {
            pathCount++;
        } else {
            let adjacentNodes = this._adjacentList.get(node);
            for (let index = 0; index < adjacentNodes.length; index++) {
                const element = adjacentNodes[index];
                pathCount = this._getPathCountCore(element, destination, pathCount);
            }
        }
        return pathCount;
    }
    //#endregion
    // #region Transpose of a graph

    /**
     * Transpose of a graph using DFS. Time complexity: O(V+E)
     */
    transpose() {
        let transposeGraph = new Graph();
        let visited = new Set();

        // do a modified DFS on the input graph
        for (const node of this._adjacentList.keys()) {
            this.doTransposeCore(node, transposeGraph, visited);
        }
        return transposeGraph;
    }

    doTransposeCore(node, transposeGraph, visited) {
        if (visited.has(node)) {
            return;
        }
        visited.add(node);
        const adjacentNodes = this._adjacentList.get(node);
        for (let index = 0; index < adjacentNodes.length; index++) {
            const element = adjacentNodes[index];
            transposeGraph.addEdge(element, node);
            this.doTransposeCore(element, transposeGraph, visited);
        }
    }

    /**
     * Transpose of a graph iteratively. Time complexity: O(V2)
     */
    transposeIterative() {
        const transposeGraph = new Graph();
        for (const node of this._adjacentList.keys()) {
            this._adjacentList.get(node).forEach(adjNode => {
                transposeGraph.addEdge(adjNode, node);
            });
        }
        return transposeGraph;
    }
    // #endregion Transpose of a graph

    // #region Find mother vertex of a graph
    /**
     * Mother vertex of a directed graph is the vertex from which all vertices can be reached. There can be more than 
     * 1 mother vertices in a directed graph. This algorithm will return any 1.
     */
    getMotherVertex() {
        // This is a brute force approach. 
        // Do a DFS for each vertex. Keep a count of each visited vertex. If count = total vertices - 1, its a mother vertex
        // Time complexity : O(V(V+E))
        let visited = new Set();
        const verticesCount = this._adjacentList.size;
        for (const node of this._adjacentList.keys()) {
            this.getVisitedVertexCount(node, visited);
            if (visited.size === verticesCount) {
                return node;
            }
            visited.clear();
        }
    }

    getVisitedVertexCount(node, visited) {
        if (visited.has(node)) {
            return;
        }
        visited.add(node);
        const adjacentNodes = this._adjacentList.get(node);
        for (let index = 0; index < adjacentNodes.length; index++) {
            const element = adjacentNodes[index];
            this.getVisitedVertexCount(element, visited);
        }
    }

    // #endregion

    // #region Strongly Connected Components

    // #region Find all strongly connected components of a DAG
    getSCC(algo) {
        switch (algo) {
            case SCCAlgo.Kosaraju:
                return this.getSCCUsingKosaraju();
            default:
                return [];
        }
    }
    // #region Kosaraju Algorithm
    getSCCUsingKosaraju() {
        const visited = new Set();
        const stack = new Stack();

        // Stores the list of strongly connected components. Each item 
        // is a SCC (collection of vertices in a SCC)
        const stronglyConnectedComponents = [];

        // Kosaraju algorithm has 3 main steps:
        // 1. Do a DFS on the graph. Store the visited vertex. Store the last finished vertex in a stack
        for (const vertex of this._adjacentList.keys()) {
            this.doDFSKosaraju1(vertex, visited, stack);
        }

        // 2. Transpose the graph
        const transposedGraph = this.transpose().getAdjacentList();

        // 3. Do a DFS on the transposed graph. 
        visited.clear();
        while (!stack.isEmpty()) {
            const vertex = stack.pop();
            const scc = [];
            // do a DFS on the transposed graph starting from the vertex
            this.doDFSKosaraju2(transposedGraph, vertex, visited, scc);
            if (scc.length > 0) {
                stronglyConnectedComponents.push(scc);

            }
        }

        return stronglyConnectedComponents;
    }

    doDFSKosaraju1(vertex, visited, stack) {
        if (visited.has(vertex)) {
            return;
        }
        visited.add(vertex);
        const adjacentVertices = this._adjacentList.get(vertex);
        for (let index = 0; index < adjacentVertices.length; index++) {
            const adjacentVertex = adjacentVertices[index];
            this.doDFSKosaraju1(adjacentVertex, visited, stack);
        }
        stack.push(vertex);
    }

    doDFSKosaraju2(graph, vertex, visited, scc) {
        if (visited.has(vertex)) {
            return;
        }
        visited.add(vertex);
        const adjacentVertices = graph.get(vertex);
        for (const adjacentVertex of adjacentVertices) {
            this.doDFSKosaraju2(graph, adjacentVertex, visited, scc);
        }
        scc.push(vertex);
    }

    // #endregion Kosaraju Algorithm

    // #region Tarjan Algorithm
    // #endregion Tarjan Algorithm


    // #endregion Find all strongly connected components of a DAG

    // #endregion Strongly Connected Components

    // #region Cycle Detection
    // #region DFS
    detectCycle() {
        let visiting = new Set();
        let visited = new Set();
        let hasCycle = false;
        for (const vertex of this._adjacentList.keys()) {
            if (this._detectCycleCore(vertex, visiting, visited)) {
                return true;
            }
        }
        return false;
    }

    _detectCycleCore(vertex, visiting, visited) {
        visiting.add(vertex);
        // Visit
        const adjacentVertices = this._adjacentList.get(vertex);
        for (let index = 0; index < adjacentVertices.length; index++) {
            const adjacentVertex = adjacentVertices[index];
            if (visited.has(adjacentVertex)) {
                continue;
            }

            if (visiting.has(adjacentVertex)) {
                return true;
            }
            if (this._detectCycleCore(adjacentVertex, visiting, visited)) {
                return true;
            }

        }
        visiting.delete(vertex);
        visited.add(vertex);
    }
    // #endregion DFS
    // #endregion Cycle Detection

    // #region Mother Vertex
    getMotherVertex() {
        const stack = new Stack();
        const visitedNodes = [];
        // Do a DFS on graph 
        this.doMotherVertexDFS1(stack);
        // pop the top element
        const motherVertex = stack.pop();
        // do a DFS starting from mother vertex and see i
        visitedNodes.push(motherVertex);
        doMotherVertexDFS2(visitedNodes);

        return visitedNodes.length === this.getVerticesCount() ? motherVertex : null;
    }

    doMotherVertexDFS1(stack) {
        const visited = new Set();
        const adjacentList = this._adjacentList.keys;
        for (const vertex of adjacentList) {
            doMotherVertexDFS1Core(vertex, stack, visited);
        }
    }

    doMotherVertexDFS1Core(vertex, stack, visited) {
        if (visited.has(vertex)) {
            return;
        }
        visited.add(vertex);
        const adjacentVertices = this.getAdjacentList().get(vertex);
        for (const adjacentVertex of adjacentVertices) {
            this.doMotherVertexDFS1Core(adjacentVertex, stack, visited);
        }
        // post visit
        stack.push(vertex);
    }

    doMotherVertexDFS2(vertex, visitedNodes) {
        const visited = new Set();
        for (const vertex of this.getAdjacentList().get(vertex)) {
            this.doMotherVertexDFS2Core(vertex, graph, visited, visitedNodes);
        }
    }

    doMotherVertexDFS2Core(vertex, visited, visitedNodes) {
        if (visited.has(vertex)) {
            return;
        }
        visited.set(vertex);
        const adjacentNodes = this.getAdjacentList().get(vertex);
        for (const adjacentVertex of adjacentNodes) {
            this.doMotherVertexDFS2Core(adjacentVertex, visited, visitedNodes);
        }
        visitedNodes.push(vertex);
    }
    // #endregion Mother Vertex

    // #region Degree of Vertex
    /**
     * Degree of a vertex is = In degree + Out degree
     * In degree = Number of edges incident into the vertex. Incoming edges
     * Out degree = Number of edges incident away from the vertex. Outgoing edges
     */

    /**
     * Returns the out degree of a vertex
     * Time Complexity: O(AdjList(V)), where AdjList(V) = adjacency list of a vertex V
     * @param {Vertex} vertex 
     */
    getOutdegree(vertex) {
        return this._adjacentList.get(vertex).length;
    }

    /**
     * Returns the in degree of a vertex
     * @param {*} vertex 
     */
    getIndegree(v) {
        let inDegree = 0;
        for (const vertex of this._adjacentList.keys()) {
            if (v !== vertex) {
                if (this._adjacentList.get(vertex).includes(v)) {
                    inDegree++;
                }
            }
        }
        return inDegree;
    }

    /**
     * Gets indegree of all the vertices of the graph
     * @returns - Map<vertex, indegree>
     */
    getIndegreeForGraph() {
        const indegreeMap = new Map();
        for (const vertex of this._adjacentList.keys()) {
            if (!indegreeMap.has(vertex)) {
                indegreeMap.set(vertex, 0);
            }
            this._adjacentList.get(vertex).map(adjVertex => {
                let count = indegreeMap.has(adjVertex) ? indegreeMap.get(adjVertex) : 0;
                indegreeMap.set(adjVertex, ++count);
            });
        }
        return indegreeMap;
    }

    getVertexWithZeroIndegree(indegreeMap) {
        const vertices = [];
        indegreeMap.forEach((value, key) => {
            if (value === 0) {
                vertices.push(key)
            }
        });
        return vertices;
    }
    // #endregion Degree of vertex
}

module.exports = {
    Graph
};

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
// graph.addVertex('G');
// graph.addVertex('H');
// graph.addVertex('I');
// graph.addVertex('J');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('A', 'D');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
//graph.addEdge('F','D');
// graph.addEdge('H','G');
// graph.addEdge('E','F');
// graph.addEdge('E','G');
// graph.addEdge('E','H');
// graph.addEdge('F','G');
// graph.addEdge('F','B');
// console.log(graph.doToplogicalSortUsingKahn());
// console.log(graph.doTopologicalSort());
console.log(graph.isPathExists('C','F'));

//#region Topological Sort for package dependencies

//#endregion 
// #region SCC Algo

// Test Case 1
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addVertex('G');
// graph.addVertex('H');
// graph.addVertex('I');
// graph.addVertex('J');
// graph.addVertex('K');
// graph.addVertex('L');
// graph.addEdge('A','B');
// graph.addEdge('B','C')
// graph.addEdge('C','A')
// graph.addEdge('B','D')
// graph.addEdge('D','E')
// graph.addEdge('E','F')
// graph.addEdge('F','D')
// graph.addEdge('G','F')
// graph.addEdge('G','H')
// graph.addEdge('H','I')
// graph.addEdge('I','J')
// graph.addEdge('J','G')
// graph.addEdge('J','K');
// graph.addEdge('K','L');

// Test Case 2
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');
graph.addVertex('J');
graph.addVertex('K');
graph.addVertex('L');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('E', 'B');
graph.addEdge('E', 'F');
graph.addEdge('F', 'C');
graph.addEdge('E', 'G');
graph.addEdge('F', 'H');
graph.addEdge('G', 'H');
graph.addEdge('G', 'J');
graph.addEdge('H', 'K');
graph.addEdge('I', 'G');
graph.addEdge('J', 'I');
graph.addEdge('K', 'L');
graph.addEdge('L', 'J');
//console.log(graph.getSCC(SCCAlgo.Kosaraju));
// #endregion SCC Algo

// #region Topological Sort
// graph.addVertex(0);
// graph.addVertex(1);
// graph.addVertex(2);
// graph.addVertex(3);
// graph.addVertex(4);
// graph.addVertex(5);

// graph.addEdge(2, 3);
// graph.addEdge(3, 1);
// graph.addEdge(4, 0);
// graph.addEdge(4, 1);
// graph.addEdge(5, 0);
// graph.addEdge(5, 2);
// console.log(graph.doTopologicalSort());
// #endregion Topological Sort

//#region Shortest Path input

//  const network = {
//     'Min'     : ['William', 'Jayden', 'Omar'],
//     'William' : ['Min', 'Noam'],
//     'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
//     'Ren'     : ['Jayden', 'Omar'],
//     'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
//     'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
//     'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
//     'Noam'    : ['Nathan', 'Jayden', 'William'],
//     'Omar'    : ['Ren', 'Min', 'Scott'],
//     ...
//   };

//  graph.addVertex('Min');
//  graph.addVertex('William');
//  graph.addVertex('Jayden');
//  graph.addVertex('Omar');
//  graph.addVertex('Min');
//  graph.addVertex('Noam');
//  graph.addVertex('Amelia');
//  graph.addVertex('Ren');
//  graph.addVertex('Adam');
//  graph.addVertex('Miguel');
//  graph.addVertex('Sofia');
//  graph.addVertex('Lucas');
//  graph.addVertex('Liam')
//  graph.addVertex('Nathan')
//  graph.addVertex('Scott')

//  graph.addEdge('Min','William');
//  graph.addEdge('Min','Jayden');
//  graph.addEdge('Min','Omar');

//  graph.addEdge('William','Min');
//  graph.addEdge('William','Noam');

//  graph.addEdge('Jayden','Min');
//  graph.addEdge('Jayden','Amelia');
//  graph.addEdge('Jayden','Ren');
//  graph.addEdge('Jayden','Noam');

//  graph.addEdge('Ren','Jayden');
//  graph.addEdge('Ren','Omar');

//  graph.addEdge('Amelia','Jayden')
//  graph.addEdge('Amelia','Adam')
//  graph.addEdge('Amelia','Miguel')

//  graph.addEdge('Adam','Amelia')
//  graph.addEdge('Adam','Miguel')
//  graph.addEdge('Adam','Sofia')
//  graph.addEdge('Adam','Lucas')

//  graph.addEdge('Miguel','Amelia')
//  graph.addEdge('Miguel','Adam')
//  graph.addEdge('Miguel','Liam')
//  graph.addEdge('Miguel','Nathan')

// graph.addEdge('Noam','Nathan')
// graph.addEdge('Noam','Jayden')
// graph.addEdge('Noam','William')

// graph.addEdge('Omar','Ren')
// graph.addEdge('Omar','Min')
// graph.addEdge('Omar','Scott')


// console.log(graph.getShortestPath('Scott','Adam'));
//#endregion 

