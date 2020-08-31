/**
Given a sorted array, find the first and last occurence of a key in the array. If no such key exists, return -1
Example:
arr = [1,2,3,4,10,10,10,11,12,14], key = 10
Returns: [4,6]. First occurence of 10 is at key 4 and last occurence is at key 6

ALGO:
Since this is a sorted array, we must apply binary search.
1. Do binary search to find the key. If key not found return -1.
2. Note down the index of the key found in STEP 1
3. In normal binary search, we would have stopped our search as we found the key. But we need to continue our search
   as there could be more occurences of the key in the array.

4. To find first occurence, we do BS on the left of index . Every time we find key, update first occurence
5. To find last occurence , we do BS on right of index. Every time we find key, update last occurence
 */
const OCCURENCE_TYPE = {
  first: "FIRST",
  second: "SECOND",
};
const EMPTY = [];

function getFirstAndLastOccurences(array, key) {
  if (array == null || array.length === 0) {
    return EMPTY;
  }
  const length = array.length - 1;
  // Do binary search to find the key
  const index = doBinarySearch(0, length);
  if (index === -1) {
    // If key not found return
    return EMPTY;
  }
  // Set first and last occurence to index. As we have found the key, this might be the only occurence
  let firstOccurence = index,
    lastOccurence = index;
  // Search in left for first occurence
  doBinarySearchForFirstAndLastOccurence(0, index - 1, OCCURENCE_TYPE.first);
  // Search in right for first occurence
  doBinarySearchForFirstAndLastOccurence(index + 1, length, OCCURENCE_TYPE.second);

  return [firstOccurence, lastOccurence];

  function doBinarySearch(low, high) {
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (array[mid] === key) {
        return mid;
      }
      if (array[mid] > key) {
        high = mid - 1;
      }
      if (array[mid] < key) {
        low = mid + 1;
      }
    }
    return -1;
  }
  function doBinarySearchForFirstAndLastOccurence(low, high, occurenceType) {
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (array[mid] === key) {
        if (occurenceType === OCCURENCE_TYPE.first) {
          firstOccurence = mid;
          high = mid - 1;
        } else {
          lastOccurence = mid;
          low = mid + 1;
        }
      }
      if (array[mid] > key) {
        high = mid - 1;
      }
      if (array[mid] < key) {
        low = mid + 1;
      }
    }
  }
}

module.exports = {
    getFirstAndLastOccurences
};

console.log(
  getFirstAndLastOccurences([10, 10, 10, 10, 10, 10, 11, 12, 14], 14)
); // [0, 5]
