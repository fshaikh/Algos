'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

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

    getVertices() {
        return Array.from(this.getAdjacencyList().keys());
    }

    getEdges() {
        const edges = [];
        for (const [key, value] of this.getAdjacencyList().entries()) {
            edges.push(...this.getAdjacencyList().get(key));
        }
        return edges;
    }
    //#endregion Basic Functions
}

class SetElement {
    constructor(value, parent, rank) {
        this.value = value;
        this.parent = parent;
        this.rank = rank;
    }
}

class RankInfo {
    constructor(parent, normalizedRank) {
        this.parentElement = parent;
        this.normalizedRank = normalizedRank;
    }
}

class DisjointSet {
    //#region Public Constructors
    constructor(elements) {
        this.initialize();
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const setElement = new SetElement(element, this._parent, this._seedRank);
            this._sets[element] = setElement;
            this.disjointSets.set(setElement, [setElement]);
        }
        // elements.forEach(element => {
        //     this._sets
        //     this._sets.push(new SetElement(element, this._parent, this._seedRank));
        // });
    }
    //#endregion Public Constructors

    //#region Public Functions
    /**
     * If both elements belong to the same set, do nothing.
     * If both elements belong to different set:
     *   - Create a union of the 2 sets i.e S1 U S2 (all elements of S1 and S2 now belong to a new set)
     *   - Mark an element as a representative 
     * @param {*} element1 
     * @param {*} element2 
     */
    union(element1, element2) {
        const setElement1 = this._getSetElement(element1);
        const setElement2 = this._getSetElement(element2);

        // First check if both elements are present in the universal set
        if (setElement1 == null || setElement2 == null) {
            throw new Error('Cannot perform union as one of the elements is invalid')
        }

        // If both elements have the same parent ( same set)
        const rootParent1 = this._getRootParent(setElement1);
        const rootParent2 = this._getRootParent(setElement2);

        if (rootParent1.value === rootParent2.value) {
            // return
            return false;
        }

        // 4. If both elements have different parent (different set), do the union
        const representativeElement = this._getRepresentativeElement(setElement1, setElement2);
        const other = rootParent1.value !== representativeElement.value ? rootParent1 : rootParent2;
        // Change the parent of the other set
        other.parent = representativeElement.value;
        // Change the rank of the representative element
        representativeElement.rank = this._getNewRank(representativeElement, other.rank)

        // For faster extract, add to disjointSet
        this._addToDisjointSet(representativeElement, other);
        return true;
    }

    /**
     * Returns the set in which the given element has membership of
     * @param {*} element - Element to find membership for 
     */
    find(element) {

    }

    /**
     * Checks if the passed in elements are connected i.e they belong to the same set.
     * This can be used in scenarios where user needs to find connectivity between 2 elements
     * @param {*} element1 
     * @param {*} element2 
     */
    isConnected(element1, element2) {
        const setElement1 = this._getSetElement(element1);
        const setElement2 = this._getSetElement(element2);

        // If both elements have the same parent ( same set)
        const rootParent1 = this._getRootParent(setElement1);
        const rootParent2 = this._getRootParent(setElement2);

        return rootParent1.value === rootParent2.value;
    }

    /**
     * Extracts disjoint sets
     * @param {Boolean} simple -  
     */
    extract(simple = true) {
        return Array.from(this.disjointSets.values())
            .map(value => {
                return simple ?
                    this._extractSimpleValues(value) :
                    this._extractCompleteSet(value);
            });
    }

    //#endregion Public Functions

    //#region Private Functions
    /**
     * Initializes the state 
     */
    initialize() {
        this._sets = [];
        this._seedRank = -1;
        this._parent = -1;
        // key => representative element
        // value => array of set elements
        this.disjointSets = new Map();
    }
    /**
     * Returns the parent of the element (or the set the element belongs to)
     * @param {*} element 
     */
    _getParent(setElement) {
        return setElement.parent === this._parent ? setElement.value : setElement.parent;
    }

    /**
     * Determines if the 2 elements have the same parent (belong to the same set)
     * @param {*} element1 
     * @param {*} element2 
     */
    _hasSameParent(setElement1, setElement2) {
        return this._getParent(setElement1) === this._getParent(setElement2);

    }

    /**
     * Gets the root parent for a set element. It backtracks till it finds a set element whose
     * parent is -1. A set element with parent value -1 is the root parent or representative element
     * of the set
     * @param {*} setElement - Set element whose root parent is to be found
     */
    _getRootParent(setElement) {
        let temp = setElement;
        while (temp.parent !== this._parent) {
            temp = this._getSetElement(temp.parent);
        }
        return temp;
    }

    /**
     * Returns the rank of an element. If the element is the representative element of the set,
     * returns the rank of the same element, else returns the rank of the root parent element.
     * @param {*Element} setElement 
     */
    _getRankInfo(setElement) {
        const temp = this._getRootParent(setElement);
        return new RankInfo(temp, temp.rank * this._seedRank);
    }

    _getSetElement(element) {
        return this._sets[element];
    }

    /**
     * Returns the representative element for the new set
     * @param {*} element1 
     * @param {*} element 
     */
    _getRepresentativeElement(setElement1, setElement2) {
        const rankInfo1 = this._getRankInfo(setElement1);
        const rankInfo2 = this._getRankInfo(setElement2);
        return rankInfo1.normalizedRank >= rankInfo2.normalizedRank ?
            rankInfo1.parentElement : rankInfo2.parentElement;
    }

    /**
     * Returns the new rank for a set element
     * @param {*} setElement - Element whose rank is to be changed 
     * @param {*} delta - Value to increase the rank by
     */
    _getNewRank(setElement, delta) {
        return setElement.rank + delta;
    }

    _addToDisjointSet(representativeElement, other) {
        const values = [];
        const currentValues = this.disjointSets.get(representativeElement);
        values.push(...currentValues);
        values.push(...this.disjointSets.get(other));

        this.disjointSets.set(representativeElement, values);
        this.disjointSets.delete(other);
    }

    _extractSimpleValues(value) {
        return [...value.map(v => v.value)];
    }

    _extractCompleteSet(value) {
        return [...value];
    }
    //#endregion Private Functions
}

class MinimumSpanningTree {
    constructor() {
        this.spanningTree = [];
        this.totalWeight = 0;
    }

    setMST(spanningTree) {
        this.spanningTree = spanningTree;
        this.totalWeight = this.spanningTree.reduce((sum, edge) => {
            return sum + edge.weight;
        }, 0);
    }

    getTotalWeight() {
        return this.totalWeight;
    }

    getMST() {
        return this.spanningTree;
    }
}

function getMinimumSpanningTree(graph) {
    const mst = new MinimumSpanningTree();
    const mstEdges = [];
    const edges = graph.getEdges();
    // Sort the edges in ascending order of edge weights
    const sortedEdges = getSortedEdges(edges);
    const vertices = graph.getVertices().map(vertex => vertex.value);
    const disjointSet = new DisjointSet(vertices);

    sortedEdges.forEach(edge => {
        const toAdd = disjointSet.union(edge.sourceVertex.value, edge.targetVertex.value);
        if (toAdd) {
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
    edges.sort((edge1,edge2) => {
       if(edge1.weight > edge2.weight){
           return 1;
       }
       if(edge1.weight < edge2.weight){
           return -1;
       }

       if(edge1.weight === edge2.weight){
          // Choose the edge that minimizes the sum u + v + wt
          // where u and v are vertices and wt is the edge weight.
          const sum1 = edge1.sourceVertex.value + edge1.targetVertex.value + edge1.weight;
          const sum2 = edge2.sourceVertex.value + edge2.targetVertex.value + edge2.weight;
          if(sum1 === sum2){
             return 0;
          }
          if(sum1 > sum2){
             return 1;
          }else{
             return -1;
          }
       }
    });
    return edges;
 }
/*
 * Complete the 'kruskals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
 */

/*
 * For the weighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] and <name>To[i]. The weight of the edge is <name>Weight[i].
 *
 * g_nodes: an integer that represents the number of nodes in the tree
g_from: an array of integers that represent beginning edge node numbers
g_to: an array of integers that represent ending edge node numbers
g_weight: an array of integers that represent the weights of each edge
 */

function kruskals(gNodes, gFrom, gTo, gWeight) {
    const weightedGraph = constructGraph(gNodes, gFrom, gTo, gWeight);
    const mst = getMinimumSpanningTree(weightedGraph);
    return mst.getTotalWeight();
}

function constructGraph(gNodes, gFrom, gTo, gWeight) {
    const graph = new WeightedGraph();
    const map = new Map();
    for (let i = 1; i <= gNodes; i++){
        const vertex = new Vertex(i);
        graph.addVertex(vertex);
        map.set(i, vertex);
    }
    
    for (let j = 0; j < gFrom.length; j++){
        graph.addEdge(new Edge(map.get(gFrom[j]), map.get(gTo[j]), gWeight[j]));
    }
    return graph;
}

function main() {

    const gNodesEdges = readLine().split(' ');

    const gNodes = parseInt(gNodesEdges[0], 10);
    const gEdges = parseInt(gNodesEdges[1], 10);

    let gFrom = [];
    let gTo = [];
    let gWeight = [];

    for (let i = 0; i < gEdges; i++) {
        const gFromToWeight = readLine().split(' ');

        gFrom.push(parseInt(gFromToWeight[0], 10));
        gTo.push(parseInt(gFromToWeight[1], 10));
        gWeight.push(parseInt(gFromToWeight[2], 10));
    }

    const res = kruskals(gNodes, gFrom, gTo, gWeight);

    console.log(res);
}
38555240
6359060
