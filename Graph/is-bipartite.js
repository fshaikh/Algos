/**
A graph is said to be bi-partite, if it can be divided into 2 sets of vertices, such that edge exists only between vertices
from different sets. No edge exists between vertices in the same set
For eg: Consider a graph:
1 --- 2
  
3 --- 4
ALGO:
Uses GRAPH COLORING. Each vertex will be assigned one of 2 colors. For eg , RED, BLACK
Do a BFS. Any time we find 2 adjacent vertices have the same color, return false. This is because no edge can exist
between vertices of the same set
 */
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (nodes) {
  const queue = [],
    visited = new Set(),
    colors = [],
    graph = new Graph(),
    NO_COLOR = "",
    COLORS = {
      RED: "Red",
      BLACK: "Black",
    };
  let startVertex;

  for (let i = 0; i < nodes.length; i++) {
    const edges = nodes[i];
    for(let i=0;i<edges.length;i++)
    graph.addEdge(nodes[i][0], nodes[i][1]);
    if (startVertex == null) {
      startVertex = nodes[i][0];
    }
  }
  for (let i = 0; i < graph.getVerticesCount(); i++) {
    colors[i] = NO_COLOR;
  }
  colors[startVertex] = COLORS.RED;
  queue.unshift(startVertex);
  visited.add(startVertex);
  while (queue.length !== 0) {
    const vertex = queue.shift();
    const adjVertices = graph.getAdjacentVertices(vertex);
    for (let i = 0; i < adjVertices.length; i++) {
      const adjVertex = adjVertices[i];
      if (colors[i] === NO_COLOR) {
        // We are visiting a vertex for the first time, so it will not have any color.
        // Assign a color which is different from the neighbour
        colors[i] = colors[vertex] === COLORS.BLACK ? COLORS.RED : COLORS.BLACK;
        if (!visited.has(adjVertex)) {
          visited.add(adjVertex);
          queue.unshift(adjVertex);
        }
      } else {
        // If two neighbours have the same color, it implies there is an edge between 2 vertices from the
        // same set. The graph is not  bipartite
        if (colors[i] === colors[vertex]) {
          return false;
        }
      }
    }
  }
  return true;
};

class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(v) {
    if (!this.hasVertex(v) && v != null) {
      this.adjacencyList.set(v, []);
    }
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);
    if (v1 != null && v2 != null && this.adjacencyList.get(v1).includes(v2)) {
      this.adjacencyList.get(v1).push(v2);
    }
    if (v2 != null && v1 != null && !this.adjacencyList.get(v2).includes(v1)) {
      this.adjacencyList.get(v2).push(v1);
    }
  }

  hasVertex(v) {
    return this.adjacencyList.has(v);
  }

  getVerticesCount() {
    return this.adjacencyList.size;
  }

  getAdjacentVertices(v) {
    return this.adjacencyList.get(v);
  }
}

// console.log(
//   isBipartite([
//     [1, 2, 3],
//     [0, 2],
//     [0, 1, 3],
//     [0, 2],
//   ])
// );
// console.log(
//   isBipartite([
//     [1, 3],
//     [0, 2],
//     [1, 3],
//     [0, 2],
//   ])
// );

// console.log(isBipartite([[1], [0, 3], [3], [1, 2]]));
console.log(2 < 2);