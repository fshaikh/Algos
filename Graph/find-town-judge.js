/**
 In a town, there are N people labelled from 1 to N.  There is a rumor that one of these people 
 is secretly the town judge.

If the town judge exists, then:

The town judge trusts nobody.
Everybody (except for the town judge) trusts the town judge.
There is exactly one person that satisfies properties 1 and 2.
You are given trust, an array of pairs trust[i] = [a, b] representing that the person
 labelled a trusts the person labelled b.

If the town judge exists and can be identified, return the label of the town judge.  Otherwise, return -1.

 

Example 1:

Input: N = 2, trust = [[1,2]]
Output: 2
Example 2:

Input: N = 3, trust = [[1,3],[2,3]]
Output: 3
Example 3:

Input: N = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
Example 4:

Input: N = 3, trust = [[1,2],[2,3]]
Output: -1
Example 5:

Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
Output: 3
 

Constraints:

1 <= N <= 1000
0 <= trust.length <= 10^4
trust[i].length == 2
trust[i] are all different
trust[i][0] != trust[i][1]
1 <= trust[i][0], trust[i][1] <= N
 */

 // #region  Approach 1 - Graph Based
 // If you read the problem carefully, it stands out as a graph problem. So the first intitution is to
 // represent the input as a graph and do graph operations.

 /**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(N, trust) {
    // vertex with 0 out-degree
    // If there is no vertex with 0 out-degree, return -1
    const graph = new Graph(N);
    for(let i=1;i<=N;i++){
        graph.addVertex(i)
    }
    for(let i=0;i<trust.length;i++){
        graph.addEdge(trust[i][0],trust[i][1]);
    }
    return graph.getTownJudge();
};

class Graph {
    constructor(N){
        this.adjacencyList = new Map();
        this.indegreeMap = new Map();
        this.N = N
    }
    
    addVertex(vertex){
        this.adjacencyList.set(vertex,[]);
        this.indegreeMap.set(vertex,0);
    }
    
    addEdge(v1,v2){
        const array = this.adjacencyList.get(v1);
        array.push(v2)
        this.adjacencyList.set(v1,array);
        
    }
    
    getTownJudge(){
        let label = -1;
        for(let v of this.adjacencyList){
            if(v[1].length === 0){
                label = v[0];
                break
            }
        }
        if(label === -1){
            return label;
        }
        this.computeIndegree();
        return this.indegreeMap.get(label) === this.N -1 ? label: -1;
    }
    
    computeIndegree(){
        for(let v of this.adjacencyList){
            for(let i=0;i<v[1].length;i++){
                const vertex = v[1][i];
                const currentIndegreeCount = this.indegreeMap.get(vertex);
                this.indegreeMap.set(vertex,currentIndegreeCount + 1)
            }
        }
    }
}
 // #endregion Approach 1 - Graph Based

 // #region - Array based
 // The problem can be solved without graph representation. This approach is array-based
 // where we find in and out degrees by traversing through the array
 // #endregion - Array based
 /**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(N, trust) {
    const indegrees = [];
   const outdegrees = [];
   for(let i=0;i<N;i++){
     indegrees[i] = 0
   }  
   for(let i=0;i<N;i++){
     outdegrees[i] = 0
   }
   for(let i=0;i<trust.length;i++){
       const sourceVertex = trust[i][0] - 1, destinationVertex = trust[i][1] - 1;
       outdegrees[sourceVertex] = outdegrees[sourceVertex] + 1;
       indegrees[destinationVertex] = indegrees[destinationVertex] + 1;
   } 
   // there must be only one vertex with outdegree 0
   // there must be only one vertex with indegrees = N - 1
   const outdegreeZero = outdegrees.findIndex((item,index) => item === 0);
     
   if(outdegreeZero === -1){
       return -1;
   }
   const indegreeN = indegrees[outdegreeZero];
   return indegreeN === N - 1 ? outdegreeZero + 1 : -1;
 };
 