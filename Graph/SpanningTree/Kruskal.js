/**
 * Kruskal's algorithm for finding Minimum Spanning Tree for a connected, weighted graph
 * Algorithm:
 * 	1. Get all the edges of the graph and store in an array in ascending order by edge weight.  O(ElogE)
	2. Create a disjoint set object and pass all the vertices of the graph. Each vertex becomes a disjoint set to start with.   O(V)
	3. Iterate the sorted edges                          O( E )
        a. Call union on disjoint set.
             If it returns true: add edge to spanning tree.
             If returns false: indicates that adding the edge to spanning tree will create a cycle, so do not add 
    4. Return the spanning tree
 * Time Complexity:
 * Space Complexity: 
 */
const DisjointSet = require('../DisjointSet/DisjointSet').DisjointSet;

class MinimumSpanningTree{
   constructor(){
      this.spanningTree = [];
      this.totalWeight = 0;
   }

   setMST(spanningTree){
      this.spanningTree = spanningTree;
      this.totalWeight = this.spanningTree.reduce((sum,edge) => {
         return sum + edge.weight;
      },0);
   }

   getTotalWeight(){
      return this.totalWeight;
   }

   getMST(){
      return this.spanningTree;
   }
}

 function getMinimumSpanningTree(graph){
    const mst = new MinimumSpanningTree();
    const mstEdges = [];
    const edges = graph.getEdges();
    // Sort the edges in ascending order of edge weights
    const sortedEdges = getSortedEdges(edges);
    const vertices = graph.getVertices().map(vertex => vertex.value);
    const disjointSet = new DisjointSet(vertices);

    sortedEdges.forEach(edge => {
      const toAdd = disjointSet.union(edge.sourceVertex.value,edge.targetVertex.value);
      if(toAdd){
         mstEdges.push(edge);
      }
    });
    mst.setMST(mstEdges);
   return mst;
 }

 /**
  * Sort the edges in ascending order by edge weight 
  * @param edges - Array containing edges to sort by edge weight
  */
 function getSortedEdges(edges){
   edges.sort((edge1,edge2) => edge1.weight > edge2.weight);
   return edges;
}

const WeightedGraph = require('../WeightedGraph.js').WeightedGraph;
const Vertex = require('../WeightedGraph.js').Vertex;
const Edge = require('../WeightedGraph.js').Edge;

const nwgraph = new WeightedGraph();
const vertex1 = new Vertex(1);
const vertex2 = new Vertex(2);
const vertex3 = new Vertex(3);
const vertex4 = new Vertex(4);
const vertex5 = new Vertex(5);
const vertex6 = new Vertex(6);

nwgraph.addVertex(vertex1);
nwgraph.addVertex(vertex2);
nwgraph.addVertex(vertex3);
// nwgraph.addVertex(vertex4);
// nwgraph.addVertex(vertex5);
// nwgraph.addVertex(vertex6);


nwgraph.addEdge(new Edge(vertex1,vertex2,10));
nwgraph.addEdge(new Edge(vertex1,vertex3,20));
nwgraph.addEdge(new Edge(vertex2,vertex3,10));



//console.log(getMinimumSpanningTree(nwgraph));
function miniMaxSum(arr) {
   arr.sort();
   const minimum = arr.slice(0, arr.length - 1).reduce((sum, value) => sum + value, 0);
   const maximum = arr.slice(1).reduce((sum, value) => sum + value, 0);
   console.log(`${minimum} ${maximum}`);
}

miniMaxSum([7, 69, 2, 221, 8974])



