/**
 Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */

 /**
 * @param {number[][]} intervals
 * @return {number[][]}
 * @description - 
 * 1. Sort the intervals by start time descending
 * 2. Add the first interval to output array
 * 3. Iterate intervals from 1 to end
 * 4.    Check if interval overlaps with the last item of output array [1,3] , [2,4]
 * 5.    If overlap, check if end time of output array item > end time of interval item. If , skip
 * 6.       else, modify the end time of last item of output array with end time of interval item
 * TC: O(NLOGN), SC: O(N)
 * 
 * This reuses two concepts in intervals merge types of problems: sort by start time, find if two intervals overlap
 */
var merge = function(intervals) {
    if(intervals.length === 0){
        return intervals
    }
    intervals.sort((a,b) => a[0] - b[0]);
    const mergedResult = [];
    mergedResult.push(intervals[0])
    for(let i=1;i<intervals.length;i++){
        const m = mergedResult[mergedResult.length - 1];
        const isOverlapping = isOverlappingIntervals(intervals[i],m);
        if(!isOverlapping){
            mergedResult.push(intervals[i]);    
        }else{
            if(m[1] <= intervals[i][1]){
                m[1] = intervals[i][1];
            }
        }
    }
    return mergedResult;
};

function isOverlappingIntervals(interval1, interval2){
    const low = Math.max(interval1[0], interval2[0])
    const high = Math.min(interval1[1], interval2[1])
    return low <= high;
}

function dd(){
    const afpsStatus = [
        {
            "afp": "forter",
            "status": true
          },
          {
            "afp": "riskified",
            "status": true
          }
    ];
    return afpsStatus.some(afpStatus => afpStatus.afp === 'riskified' && afpStatus.status);
}
console.log(dd())