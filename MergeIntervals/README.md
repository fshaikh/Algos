# Main Techniques/Concepts
- Sort by start time
- Find if two intervals overlap
- Find intersection of two overlapping intervals
- Merge two intervals into one


# Find if two intervals overlap
```
function isOverlappingIntervals(interval1, interval2){
    const low = Math.max(interval1[0], interval2[0])
    const high = Math.min(interval1[1], interval2[1])
    return low <= high;
}
```

# Find intersection of two overlapping intervals
```
const low = Math.max(itemA[0],itemB[0]);
const high = Math.min(itemA[1], itemB[1]);
if(low <= high){
    intersection.push([low,high]);
}
```