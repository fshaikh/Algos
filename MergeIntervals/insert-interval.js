/**
 Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

ALGO: This combines the various merge interval techniques
 */

 /**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    if(intervals.length === 0){
        return [newInterval]
    }
    let isMerged = false;
    const output = [];
    for(let i=0;i<intervals.length;i++){
        const interval = intervals[i];
        const isOverlapping = isOverlap(interval,newInterval);
        if(!isOverlapping){
            output.push(interval);
        }else{
            isMerged = true;
            getMergedAndOverlappedInterval(interval)
            
        }
    }
    if(!isMerged){
        output.push(newInterval)
    }
    return output.sort((a,b) => a[0] - b[0]);
    
    function getMergedAndOverlappedInterval(interval){
        const mergedInterval = getMergedInterval(interval,newInterval);
        if(output.length === 0){
            output.push(mergedInterval);
            return;
        }
        const outputInterval = output[output.length -1];
        if(isOverlap(outputInterval, mergedInterval) && outputInterval[1] <= mergedInterval[1]){
                outputInterval[1] = mergedInterval[1]
        }else{
                output.push(mergedInterval)
        }
    }
    
    return output;
};

function isOverlap(interval1,interval2){
    const low = Math.max(interval1[0], interval2[0]);
    const high = Math.min(interval1[1], interval2[1]);
    return low <= high;
}

function getMergedInterval(interval1,interval2){
    return [Math.min(interval1[0],interval2[0]), Math.max(interval1[1], interval2[1])];
}

