/**
 * Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */
const Stack = require('../Stack/Stack').Stack;
var merge = function (intervals) {
    if(intervals === undefined || intervals.length === 0){
        return [];
    }
    // sort the intervals by starting time
    intervals.sort((a, b) => {
        if( a[0] < b[0]){
            return -1;
        }else if(a[0] === b[0]){
            return 0;
        }else{
            return 1;
        }
    });
    console.log(intervals);
    const stack = new Stack();
    stack.push(intervals[0]);
    for (let index = 1; index < intervals.length; index++) {
        const element = intervals[index];
        const top = stack.peek();
        if (isOverlap(element, top)) {
            const e = top[1] > element[1] ? top[1] : element[1];
            top[1] = e;
        } else {
            stack.push(element);
        }
    }
    const mergedIntervals = [];
    for (let item of stack) {
        mergedIntervals.unshift(item);
    }
    return mergedIntervals;
};

function isOverlap(t1, t2) {
    return (isBetween(t1[0], t2 || isBetween(t1[1], t2)))
}

function isBetween(num, t) {
    return (num >= t[0] && num <= t[1] ||
        num <= t[0] && num >= t[1]);
}

// console.log(merge([[15, 18], [1, 3], [5, 10], [2, 6]]));
// console.log(merge([[1, 4], [4,5]]));
// console.log(merge([[1, 4], [2,3]]));
console.log(merge([[2,3],[0,1],[1,2],[3,4],[4,5],[1,1],[0,1],[4,6],[5,7],[1,1],[3,5]]));