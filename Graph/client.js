const WeightedGraph = require('./WeightedGraph.js').WeightedGraph;
const Vertex = require('./WeightedGraph.js').Vertex;
const Edge = require('./WeightedGraph.js').Edge;

// const nwgraph = new WeightedGraph();
// const vertexA = new Vertex('A');
// const vertexB = new Vertex('B');
// const vertexC = new Vertex('C');
// const vertexD = new Vertex('D');
// const vertexE = new Vertex('E');
// const vertexF = new Vertex('F');
// const vertexG = new Vertex('G');
// const vertexI = new Vertex('I');

// nwgraph.addVertex(vertexI);
// nwgraph.addEdge(new Edge(vertexA,vertexB,10));
// nwgraph.addEdge(new Edge(vertexA,vertexE,3));
// nwgraph.addEdge(new Edge(vertexB,vertexE,4));
// nwgraph.addEdge(new Edge(vertexB,vertexC,2));
// nwgraph.addEdge(new Edge(vertexE,vertexB,1));
// nwgraph.addEdge(new Edge(vertexC,vertexD,9));
// nwgraph.addEdge(new Edge(vertexD,vertexC,7));
// nwgraph.addEdge(new Edge(vertexE,vertexD,2));
// nwgraph.addEdge(new Edge(vertexE,vertexC,8));
// nwgraph.addEdge(new Edge(vertexC,vertexF,1));
// nwgraph.addEdge(new Edge(vertexD,vertexG,8));
// nwgraph.addEdge(new Edge(vertexF,vertexG,1));
// nwgraph.addEdge(new Edge(vertexG,vertexI,1));

//#region Bellman Ford
const nwgraph = new WeightedGraph();
const vertexA = new Vertex('A');
const vertexB = new Vertex('B');
const vertexC = new Vertex('C');
const vertexD = new Vertex('D');
const vertexE = new Vertex('E');
const vertexF = new Vertex('F');
const vertexG = new Vertex('G');

// nwgraph.addEdge(new Edge(vertexA,vertexB,6));
// nwgraph.addEdge(new Edge(vertexA,vertexC,5));
// nwgraph.addEdge(new Edge(vertexA,vertexD,5));
// nwgraph.addEdge(new Edge(vertexB,vertexE,-1));
// nwgraph.addEdge(new Edge(vertexC,vertexB,-2));
// nwgraph.addEdge(new Edge(vertexD,vertexC,-2));
// nwgraph.addEdge(new Edge(vertexC,vertexE,1));
// nwgraph.addEdge(new Edge(vertexD,vertexF,-1));
// nwgraph.addEdge(new Edge(vertexE,vertexG,3));
// nwgraph.addEdge(new Edge(vertexF,vertexG,3));

nwgraph.addEdge(new Edge(vertexC,vertexB,-10));
nwgraph.addEdge(new Edge(vertexD,vertexC,3));
nwgraph.addEdge(new Edge(vertexA,vertexD,5));
nwgraph.addEdge(new Edge(vertexA,vertexB,4));

// Negative weight cycle
// nwgraph.addEdge(new Edge(vertexA,vertexB,1));
// nwgraph.addEdge(new Edge(vertexB,vertexC,-1));
// nwgraph.addEdge(new Edge(vertexC,vertexD,-1));
// nwgraph.addEdge(new Edge(vertexD,vertexA,-1));


//#endregion Bellman Ford
console.log(nwgraph.getSingleSourceShortestPathBellmanFord(vertexA));


function getVertices(count){
    const vertices = [];
    while(count > 0){
        vertices.push(new Vertex(count));
    }
    return vertices;
}

/*
Given a sorted dictionary (array of words) of an alien language, 
find order of characters in the language.
Examples:

Input:  words[] = {"baa", "abcd", "abca", "cab", "cad"}
Output: Order of characters is 'b', 'd', 'a', 'c'
Note that words are sorted and in the given language "baa" 
comes before "abcd", therefore 'b' is before 'a' in output.
Similarly we can find other orders.

Input:  words[] = {"caa", "aaa", "aab"}
Output: Order of characters is 'c', 'a', 'b'
*/