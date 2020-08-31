/**
Given 2 sorted arrays of equal size, return median of the merged sorted array

There are 3 ways. Each differ in time and space complexity
1. Brute force. Merge the 2 sorted arrays into 1 sorted array. Find median.   TC - O(M+N), SC - O(M + N)
2. Variant of brute force, but do not store.   TC - O ( M + N), SC - O(1)
3. Binary search - Uses binary search-like approach. TC - O(logN), SC - O(1)

For step 3, think about  binary search template and apply the same here
1. some while loop which runs till a condition is met
2. comparing mid element with target. If equal, return 
3. Go to left or Go to right

1. Run till size of both arrays is 2
2. Check the medians of two arrays. If same, return median
3. Now we need to go to left or right half.
    if median1 < median2 , (this is equivalent to target < key, where we go to left)
        discard left half of array1, discard right half of array2
    if median1  > median2 
        discard right half of array1, discard left half of array2

 */

function getMedianOfTwoSortedArrays(array1, array2) {
  let len1 = array1.length - 1,
    len2 = array2.length - 1;
  let low1 = 0,
    high1 = len1,
    low2 = 0,
    high2 = len2;
  while (high1 - low1 !==1) {
    const median1 = getMedian(array1, low1, high1);
    const median2 = getMedian(array2, low2, high2);
    if (median1.median === median2.median) {
      return median1.median;
    }
    if (median1.median < median2.median) {
        low1 = median1.index;
        high2 = median2.index;
    }else{
        high1 = median1.index;
        low2 = median2.index;
    }
  }
  return (Math.max(array1[low1], array2[low2]) + Math.min(array1[high1], array2[high2])) / 2;
}

function getMedian(array, low, high) {
  const length = high - low + 1;
  const mid = Math.floor((high + low) / 2);
  let median, index;
  if (length % 2 !== 0) {
    median =  array[mid];
  }else{
    median = (array[mid] + (array[mid + 1] || 0)) / 2;
  }
  return {
      median,
      index: mid
  }
}

console.log(getMedianOfTwoSortedArrays([1, 12, 15, 26, 38], [2, 13, 17, 30, 45]));
