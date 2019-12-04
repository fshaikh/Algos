'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

class Queue {
    constructor() {
        this._storage = [];
    }

    enqueue(value) {
        this._storage.push(value);
    }

    dequeue() {
        if (this._storage.length === 0) {
            return null;
        }
        const value = this._storage[0];
        this._storage.splice(0, 1);
        return value;
    }

    isEmpty() {
        return this._storage.length === 0;
    }

    getItems(){
        return this._storage;
    }
}

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
        this._adjacentList.get(sourceVertex).push(targetVertex);
    }

    getAdjacentList() {
        return this._adjacentList;
    }

    isSourceVertexAvailable(sourceVertex) {
        return this._adjacentList.has(sourceVertex);
    }

    /**
     * Given an undirected graph with equal weight for all the edges and a source vertex,
     * determine the shortest distance from source vertex to all the reachable vertices.
     * For vertices which are unreachable, set the distance as -1
     * @param {*} sourceVertex 
     * @param {*} edgeWeight 
     */
    getVertexDistances(sourceVertex, edgeWeight) {
        const visited = new Set();
        const level = [];
        const vertexDistances = new Map();
        const queue = new Queue();

        // initialize all distances as unreachable  -1
        for (const [key] of this.getAdjacentList().entries()) {
            if (key === sourceVertex) {
                continue;
            }
            vertexDistances.set(key, -1);
        }

        // add the source vertex to the queue
        queue.enqueue(sourceVertex);

        level[sourceVertex] = 0;

        while (!queue.isEmpty()) {
            const vertex = queue.dequeue();
            const adjacentVertices = this.getAdjacentList().get(vertex);
            
            for (let index = 0; index < adjacentVertices.length; index++) {
                const adjacentVertex = adjacentVertices[index];
                if (visited.has(adjacentVertex)) {
                    continue;
                }
                visited.add(adjacentVertex);
                const vertexLevel = level[vertex] + 1;
                level[adjacentVertex] = vertexLevel;
                vertexDistances.set(adjacentVertex, vertexLevel * edgeWeight);
                queue.enqueue(adjacentVertex);
            }
        }

        return Array.from(vertexDistances.values());
    }
}
// Complete the bfs function below.
function bfs(verticesCount, edgesCount, edges, sourceVertex) {
    const graph = new Graph();
    const weight = 6;

    for (let index = 1; index <= verticesCount; index++) {
        graph.addVertex(index);
    }

    for (let index = 0; index < edges.length; index++) {
        const edge = edges[index];
        graph.addEdge(edge[0], edge[1]);
    }
    const distances = graph.getVertexDistances(sourceVertex, weight);
    return distances;


}

function main() {
    const test = require('path').resolve(__dirname, 'st_temp.txt');
    const ws = fs.createWriteStream(test);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine(), 10);
        let result = bfs(n, m, edges, s);
        console.log(result)
        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
