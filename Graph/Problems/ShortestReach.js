const Graph = require('../Graph.js').Graph;

// Complete the bfs function below.
function bfs(verticesCount, edgesCount, edges, sourceVertex) {
    const graph = new Graph();
    const weight = 6;

    for (let index = 1; index <= verticesCount; index++) {
        graph.addVertex(index);
    }

    for (let index = 0; index < edges.length; index++) {
        const edge = edges[index];
        graph.addEdge(+edge[0], +edge[1]);
        graph.addEdge(+edge[1], +edge[0]);
    }
    const distances = graph.getVertexDistances(sourceVertex, weight);
    console.log(distances.join(' '));


}

const test = require('path').resolve(__dirname, 'ShortestReachTest.txt');
const fs = require('fs');
const readLine = require('readline');

const stream = fs.createReadStream(test);
const readTest = readLine.createInterface({
    input: stream
});


const edges = [];
readTest.on('line',(line)=>{
    const e = line.split(' ');
    edges.push([...e]);
});

readTest.on('close',()=>{
     bfs(70,1988,edges,16);
});

// bfs(5,3,[[1,2],[1,3],[3,4]],1);
 //bfs(4,2,[[1,2],[1,3]],1);
// bfs(3,1,[[2,3]],2);

// 16 2
// 2 63
// 63 6
