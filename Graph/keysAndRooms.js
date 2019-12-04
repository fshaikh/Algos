/**
 * There are N rooms and you start in room 0.  Each room has a distinct number in 0, 1, 2, ..., N-1,
 *  and each room may have some keys to access the next room. 

Formally, each room i has a list of keys rooms[i], and each key rooms[i][j] is an integer in [0, 1, ..., N-1]
 where N = rooms.length.  A key rooms[i][j] = v opens the room with number v.

Initially, all the rooms start locked (except for room 0). 

You can walk back and forth between rooms freely.

Return true if and only if you can enter every room.

Example 1:

Input: [[1],[2],[3],[]]
Output: true
Explanation:  
We start in room 0, and pick up key 1.
We then go to room 1, and pick up key 2.
We then go to room 2, and pick up key 3.
We then go to room 3.  Since we were able to go to every room, we return true.
Example 2:

Input: [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: We can't enter the room with number 2.
Note:

1 <= rooms.length <= 1000
0 <= rooms[i].length <= 1000
The number of keys in all rooms combined is at most 3000.
 */

 /**
 * @param {number[][]} rooms
 * @return {boolean}
 */

 const Graph = require('./Graph').Graph;
var canVisitAllRooms = function(rooms) {
    if(rooms.length === 0){
        return true;
    }
    if(rooms.length === 1 && rooms[0].length === 0){
        return true;
    }
    const graph = new Graph();
    // take each value from 0 to N and add them as vertices.   O(N)
    for(let i=0;i<rooms.length;i++){
        graph.addVertex(i);
    }
    // each array value contains adjacent vertices from that index. For eg:
      // if value at index 0 is [1,3], create a directed edge from 0->1 and 0->3.
    for (let index = 0; index < rooms.length; index++) {
        const edges = rooms[index];
        edges.forEach(vertex => {
            graph.addEdge(index,vertex);
        });
    }
    // Once the DAG is created, do a DFS. If the result array length is same as N, return true, else return false
    
    // source vertex is the first room
    const startingRoom = graph.getVertex(0);
    const isVisitedSet = new Set();
        doDFS(graph,0,isVisitedSet);
    return isVisitedSet.size === rooms.length;
  };

  function doDFS(graph,vertex,isVisitedSet){
      if(isVisitedSet.has(vertex)){
          return;
      }
      // pre visit
      isVisitedSet.add(vertex);
      // visit
      for (const adjacentVertex of graph.getAdjacentList().get(vertex)) {
          doDFS(graph,adjacentVertex,isVisitedSet);
      }
      // post visit
  }

//   console.log(canVisitAllRooms([[1,3],[3,0,1],[2],[0]]));
  console.log(canVisitAllRooms([[1],[2],[3],[]]));
//   console.log(canVisitAllRooms([[],[1,1],[2,2]]));
//   console.log(canVisitAllRooms([[]]));
// console.log(canVisitAllRooms([[3,4,6,9],[],[2,5],[],[8],[],[7],[],[1],[]]));