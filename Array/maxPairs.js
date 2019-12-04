/**
 * Given N disjoint sets (i.e no 2 sets have the same elements), find maximum pairs
 * of elements such that no pair has elements from the same set.
 * Example:
 * Consider 3 sets : [1,2,3], [4], [5,6]
 * Pairs are: [1,4],[1,5],[1,6],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6],[4,5],[4,6] = 11 pairs
 * 
 * Solution can be expressed as a mathematical expression:
 * 1 set (a)        => Pairs                                0
 * 2 sets(a,b)      => Pairs =                              (a+0)b
 * 3 sets(a,b,c)    => Pairs = ab + ac + bc =               ab + (a+b)c
 * 4 sets(a,b,c,d)  => Pairs = ab + ac + bc + ad + bd + cd = ab + (a+b)c + (a+b+c)d
 * 5 sets(a,b,c,d,e) => Pairs = ab +...                      ab + (a+b)c + (a+b+c)d + (a+b+c+d)e
 * 
 * The pattern emerges from the above which can be programmed leading to O(1) time complexity 
 */

function getMaximumPairs(setSizes) {
    let sum = 0,
        result = 0,
        noOfPairs = 0;
    setSizes.forEach(size => {
        result += sum * size;
        sum = size;
        noOfPairs += result;
    });
    return noOfPairs;
}

console.log(getMaximumPairs([2,2,2,2]));