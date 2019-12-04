/**
 * We have a list of points on the plane.  Find the K closest points to the origin (0, 0).
(Here, the distance between two points on a plane is the Euclidean distance.)
You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)

Example 1:
Input: points = [[1,3],[-2,2]], K = 1
Output: [[-2,2]]
Explanation: 
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].

Example 2:
Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
(The answer [[-2,4],[3,3]] would also be accepted.)
 
Note:
1 <= K <= points.length <= 10000
-10000 < points[i][0] < 10000
-10000 < points[i][1] < 10000
 */
const MinHeap = require('./MinHeap');
 /**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function(points, K) {
    const origin = [0,0];
    const kClosest = [];
    // calculate euclidean distance for each point to origin - O(N)
    const distanceMap = new Map();
    points.forEach(point => {
        const euclideanDistance = getEuclideanDistance(point,origin);
        distanceMap.set(point,euclideanDistance);
    });
    // create a min heap from the distance array   - O(logN)   O(N)
    const distances = [];
    for (const iterator of distanceMap.keys()) {
        distances.push(iterator);
    }
    const minHeap = new MinHeap(distances);

    // do extractMin 'k' times  - O(logN)
    for (let index = 0; index < K; index++) {
        kClosest.push(distanceMap.get(minHeap.extractMin()));
    }
    return kClosest;
};

function getEuclideanDistance(point1,point2){
    return Math.pow(point2[0] - point1[0],2) + Math.pow(point2[1] - point1[1],2);
}


console.log(kClosest([[3,3],[5,-1],[-2,4]],2));

/**
 * Given a graph (Number of edges, number of nodes, From and To node pairs),
 * you need to find the minimum weighted path from the first node(1) to the
 *  last node(N) and return it’s weight. If there exists no edge between any
 *  two vertices which would be required to complete the path from the first
 *  to the last node, then an edge can be created between them with the weight 1.

 */