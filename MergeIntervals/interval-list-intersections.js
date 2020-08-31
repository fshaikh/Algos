/**
 Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

(Formally, a closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.  The intersection of two closed intervals is a set of real numbers that is either empty, or can be represented as a closed interval.  For example, the intersection of [1, 3] and [2, 4] is [2, 3].)

 

Example 1:



Input: A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
Reminder: The inputs and the desired output are lists of Interval objects, and not arrays or lists.
 

Note:

0 <= A.length < 1000
0 <= B.length < 1000
0 <= A[i].start, A[i].end, B[i].start, B[i].end < 10^9
 */

 // Algorithm:
 // Key thing to note is that the arrays are sorted. Also closed interval so need to consider boundary matching
 // as well

 // 1. Iterate both arrays
 // 2. Find if two time intervals have overlap
 // 3. If overlap, find intersection and add to results
 // 4. If first end time < second end time, increment first list, else increment second list

 // Key logic is to do STEPS 2 and 3
 /**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
var intervalIntersection = function(A, B) {
    const intersection = [];
    let aIndex = 0, bIndex = 0;
    while(aIndex < A.length && bIndex < B.length){
        const itemA = A[aIndex], itemB = B[bIndex];
        // check if overlap
        // If overlap, find the intersection and add
        const inter = isOverlap(itemA, itemB);

        if(inter.length !== 0){
            intersection.push(inter);
        }
  
        
        // increment the index of smaller of the two item,If same, increment both
        if(itemA[1] < itemB[1]){
            aIndex++;
        }else{
            bIndex++;
        }
    }
    return intersection;
    
};


function isOverlap(a,b){
    // sort by start time
    const array = [a,b].sort((a1,b1) => a1[0] - b1[0]);
    const isOverlap = array[0][0] === array[1][0] ? true : array[1][0] <= array[0][1];
    if(isOverlap){
        if(array[0][0] === array[1][0]){
            return [array[0][0], Math.min(array[0][1], array[1][1])]
        }else{
            return [array[1][0], Math.min(array[0][1],array[1][1])]
        }
    }
    return [];
}


/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
var intervalIntersectionOptimal = function(A, B) {
    const intersection = [];
    let aIndex = 0, bIndex = 0;
    while(aIndex < A.length && bIndex < B.length){
        const itemA = A[aIndex], itemB = B[bIndex];
        // check if overlap
        // If overlap, find the intersection and add
        const low = Math.max(itemA[0],itemB[0]);
        const high = Math.min(itemA[1], itemB[1]);
        if(low <= high){
            intersection.push([low,high]);
        }
        // We are consideting end time here and not start time. 
        // Consider the test case: [8,16] and [8,12], [13,15]. 
        // If we were to consider start time, we would miss [13,15] as we would have gone past [8,16]
        if(itemA[1] < itemB[1]){
            aIndex++;
        }else{
            bIndex++
        }

        
    }
    return intersection;
    
};
