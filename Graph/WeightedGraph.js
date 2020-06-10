class Vertex {
    constructor(value) {
        this.value = value;
    }
}

class Edge {
    constructor(sourceVertex, targetVertex, weight) {
        this.sourceVertex = sourceVertex;
        this.targetVertex = targetVertex;
        this.weight = weight;
    }
}

class ShortestPath {
    constructor(vertex, distance) {
        this.vertex = vertex;
        this.distance = distance;
    }
}

class WeightedGraph {
    //#region Basic Functions
    constructor() {
        this._adjacencyList = new Map();
    }

    addVertex(vertex) {
        this._adjacencyList.set(vertex, [])
    }

    addEdge(edge) {
        // if source vertex is not present in the grasph first add it
        const isSourceVertexPresent = this.isVertexAvailable(edge.sourceVertex);
        if (!isSourceVertexPresent) {
            this.addVertex(edge.sourceVertex);
        }
        this._adjacencyList.get(edge.sourceVertex).push(edge);
    }

    isVertexAvailable(sourceVertex) {
        return this._adjacencyList.has(sourceVertex);
    }

    getAdjacencyList() {
        return this._adjacencyList;
    }

    getVertices(){
        return Array.from(this.getAdjacencyList().keys());
    }

    getEdges(){
        const edges = [];
        for (const [key,value] of this.getAdjacencyList().entries()) {
            edges.push(...this.getAdjacencyList().get(key));
        }
        return edges;
    }
    //#endregion Basic Functions

    //#region Djikstara Shortest Path
    getSingleSourceShortestPathDjikstara(sourceVertex) {
        // Holds the results
        const shortestPaths = [];
        // Data structure to hold the vertices with the corresponding distances.
        const distanceMap = new Map();
        // Holds visited vertices
        const visited = new Set();

        // Get the adjacent vertices for source vertex and add to the distance map
        const adjacentVertices = this._adjacencyList.get(sourceVertex);
        adjacentVertices.forEach(edge => {
            distanceMap.set(edge.targetVertex, edge.weight);
        });

        // Start iterating for each vertex in the distance map
        let count = distanceMap.size;
        while (count > 0) {
            // pick the vertex at the least distance
            const minimumDistanceVertex = this.getVertexWithLeastDistance(distanceMap);

            // get adjacent vertices of minimumDistanceVertex
            const adjacentVerticesForMinimumDistanceVertex = this._adjacencyList.get(minimumDistanceVertex);
            for (let index = 0; index < adjacentVerticesForMinimumDistanceVertex.length; index++) {
                const adjacentEdge = adjacentVerticesForMinimumDistanceVertex[index];
                if (visited.has(adjacentEdge.targetVertex)){
                    continue;
                }
                if (!distanceMap.get(adjacentEdge.targetVertex)) {
                    distanceMap.set(adjacentEdge.targetVertex, Infinity);
                }
                // apply relaxation for each adjacent vertex
                if ((distanceMap.get(minimumDistanceVertex) + adjacentEdge.weight) < distanceMap.get(adjacentEdge.targetVertex)) {
                    distanceMap.set(adjacentEdge.targetVertex, distanceMap.get(minimumDistanceVertex) + adjacentEdge.weight);
                }
            }
            this.handlePostVisit(shortestPaths, minimumDistanceVertex, distanceMap, visited)
            count = distanceMap.size;
        }
        return shortestPaths;
    }

    getVertexWithLeastDistance(distanceMap) {
        let minimum = new Edge(null, null, Infinity);
        for (const [key, value] of distanceMap.entries()) {
            if (value < minimum.weight) {
                minimum = new Edge(key, null, value);
            }
        }
        return minimum.sourceVertex;
    }

    handlePostVisit(shortestPaths, minimumDistanceVertex, distanceMap, visited) {
        shortestPaths.push(new ShortestPath(minimumDistanceVertex, distanceMap.get(minimumDistanceVertex)));
        visited.add(minimumDistanceVertex);
        // remove the minimum distance vertex as it has been processed
        distanceMap.delete(minimumDistanceVertex);
    }


    getSingleSourceShortestPaths(vertex){
        const distanceMap = new Map();
        const visited = new Set();
        const shortestPaths = [];

        // get the adjacent vertices of source vertex
        const adjacentVertices = this._adjacencyList.get(vertex);
        // for each adjacent vertex, add to distance map
        adjacentVertices.forEach(edge => {
            distanceMap.set(edge.targetVertex, edge.weight )
        });
        let count = distanceMap.size;
        while(count > 0){
            // get the vertex with the least distance
            const vertexWithMinimumDistance = this.getMinimumDistanceVertex(distanceMap);
            const adjacentVerticesForMinimumDistanceVertex = this._adjacencyList.get(vertexWithMinimumDistance);
            for(let i=0;i<adjacentVerticesForMinimumDistanceVertex.length;i++){
                const adjVertex = adjacentVerticesForMinimumDistanceVertex[i];
                distanceMap.set(adjVertex, Infinity);
                // relaxation technique
                if(distanceMap.get(vertexWithMinimumDistance) + adjVertex.weight > distanceMap.get(adjVertex)){
                    distanceMap.set(adjVertex, distanceMap.get(vertexWithMinimumDistance) + adjVertex.weight);
                }
            }
        }

        return shortestPaths;
    }
    //#endregion

    //#region Bellman-Ford 
    /**
     * Single source shortest path using Bellman-Ford algorithm.
     * Time Complexity: O(VE) .  Since we run  |V-1| iterations, and within each iteration, run for all edges
     *                    Since E can be between |V| < E < |V2|, average-case time complexity = O(V2),
     *                                                           worst-case time complexity = O(V3)
     * How it works:
     *    1. Get all the edges of the graph.
     *    2. Set iteration count to  |V-1|
     *    3. Do while iterationCount > 0
     *         3.a For each edge
     *               Apply relaxation on the edge
     *    4. Run one more iteration to detect negative weight cycle. Throw in that case
     * @param {*} sourceVertex - Source vertex from which to calculate shortest paths to all other vertices
     */
    getSingleSourceShortestPathBellmanFord(sourceVertex){
        // Get all edges of the graph
        const edges = this.getEdges();
        // get number of vertices which is the iteration count
        let iterations = this.getAdjacencyList().size;
        // data structure to store distance for each vertex from source vertex. Initially all
        // the distances will be INFINITY except source vertex which will be 0
        const distanceMap = new Map();
        distanceMap.set(sourceVertex,0);
        // apply relaxation on each edge for iterations times
        while(iterations > 0){
            for (let index = 0; index < edges.length; index++) {
                const edge = edges[index];
                if(!distanceMap.has(edge.sourceVertex)){
                    distanceMap.set(edge.sourceVertex,Infinity);
                }
                if(!distanceMap.has(edge.targetVertex)){
                    distanceMap.set(edge.targetVertex,Infinity);
                }
                // apply relaxation on the edge
                if((distanceMap.get(edge.sourceVertex) + edge.weight) < distanceMap.get(edge.targetVertex)){
                    distanceMap.set(edge.targetVertex, distanceMap.get(edge.sourceVertex) + edge.weight);
                }
            }
            iterations--;
        }

        // We throw an exception if the graph has a negative weight cycle. A negative weight cycle
        // is the one whose total edge weight is negative i.e sum of weights of the edges is negative
        // To detect it, we iterate one more time for all the edges. If we find that an edge is getting 
        // relaxed, we have detected a negative weight cycle
        let hasNegativeWeightCycle = false;
        for (let index = 0; index < edges.length; index++) {
            const edge = edges[index];
            // apply relaxation on the edge
            if((distanceMap.get(edge.sourceVertex) + edge.weight) < distanceMap.get(edge.targetVertex)){
                hasNegativeWeightCycle = true;
                break;
            }
        }
        if(hasNegativeWeightCycle){
            throw new Error('Graph has negative weight cycle');
        }
        return distanceMap;
    }

    //#endregion Bellman-Ford
}

module.exports = {
    WeightedGraph,
    Vertex,
    Edge
};