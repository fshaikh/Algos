/**
 You are given a data structure of employee information, which includes the employee's unique id,
  his importance value and his direct subordinates' id.

For example, employee 1 is the leader of employee 2, and employee 2 is the leader of employee 3.
 They have importance value 15, 10 and 5, respectively. Then employee 1 has a data structure like [1, 15, [2]],
  and employee 2 has [2, 10, [3]], and employee 3 has [3, 5, []].
   Note that although employee 3 is also a subordinate of employee 1, the relationship is not direct.

Now given the employee information of a company, and an employee id, 
you need to return the total importance value of this employee and all his subordinates.

Example 1:

Input: [[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], 1
Output: 11
Explanation:
Employee 1 has importance value 5, and he has two direct subordinates: employee 2 and employee 3. 
They both have importance value 3. So the total importance value of employee 1 is 5 + 3 + 3 = 11.
 

Note:

One employee has at most one direct leader and may have several subordinates.
The maximum number of employees won't exceed 2000.
 
 */

 /**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function(employees, id) {
    const graph = new Graph();
    for(let i=0;i<employees.length;i++){
        const {id,importance,subordinates} = employees[i];
        graph.addVertex(id,importance);
        for(let j=0;j<subordinates.length;j++){
            graph.addEdge(id,subordinates[j])
        }
    }
    let totalImportance = 0;
    // do a graph traversal starting at id
    graph.doDFS(id, (importance) => {
        totalImportance += importance;
    });
    
    return totalImportance;
};


class Graph {
    constructor(){
        this.adjacencyList = new Map();
    }
    
    addVertex(id,importance){
        this.adjacencyList.set(id, {id,importance, subordinates:[]});
    }
    
    addEdge(v1,v2){
        if(!this.adjacencyList.has(v2)){
            this.addVertex(v2);
        }
        this.adjacencyList.get(v1).subordinates.push(v2);   
    }
    
    getEmployee(id){
        return this.adjacencyList.get(id);
    }
    
    doDFS(id,callback){
        const context = this;
        const visited = new Set();
        const startingVertex = this.adjacencyList.get(id);
        
        doDFSCore(startingVertex);
        
        function doDFSCore(vertex){
            // pre-visit
            visited.add(vertex.id);
            callback(vertex.importance);
            const {subordinates} = vertex;
            subordinates.forEach(subordinate => {
               if(!visited.has(subordinate)){
                   doDFSCore(context.adjacencyList.get(subordinate));
               } 
            });
        }
    }
}