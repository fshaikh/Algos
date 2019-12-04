/**
 * 	1. Given a directed graph G, find a vertex 'v from which all vertices of G can be reached.
 *     This vertex is known as "Mother Vertex" and there can be more than one mother vertex
    Algo:
      Start with any vertex
      Do a DFS on the graph.
       For each visited vertex, add to stack.
      Top of the stack will be the vertex with "last finished time". This is a mother vertex
      Do a DFS on the graph starting with the mother vertex. Add all visited nodes to a list
      In the post visit of the vertex, check if the length of the list is equal to the nimber of vertices 
      in the graph. If it is, this implies we have able to reach all the vertices in the graph,
      else not able to reach all the vertices in the graph
    Time Complexity:   O(V + E)  
 */
const Stack = require('../Stack/Stack').Stack;
const Graph = require('./Graph')

 

 const graph = new graph();