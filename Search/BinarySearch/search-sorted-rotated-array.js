/**
Given a sorted and rotated array, search for an element in O(logN)
Example:
array: [3,4,5,1,2], key = 8
The above array is rotated to the right by 2. Original array is [1,2,3,4,5]

It is trivial to do this in O(N) time by doing a linear scan and comparing each element with the key

This problem is related to number-of-times-sorted-array-rotated problem. On that problem, we were finding 
how many times is the array rotated. This was done by finding the min element in O(LOGN) time as the min
element is a pivot element around which the array is rotated. Also min element is the only element 
where: a[i-1] > min < a[i+1]. For eg: in the above array, 1 is a min element and 5 > 1 < 2. 
No other element exhibits this property

ALGO:
1. Find the min element in O(LOGN)
2. Array to left of min and array to right of min will be sorted. 
    Do binary search on left array
    Do binary search on right array
3. Return from the above two. If element is present in one of the sub-array, it will return index, else -1

    
*/

function searchInSortedRotatedArray(array, key) {
  const minElement = getMinElementIndex(array);
  if (minElement === -1) {
    throw new Error(
      "Array does not have minimum element. Cannot process request"
    );
  }
  if (array[minElement] === key) {
    return minElement;
  }
  if(minElement === 0){
      // Array is sorted but not rotated
      return doBinarySearch(array,key,0,array.length - 1);
  }else if(array[0] > key){
      return doBinarySearch(array,key,minElement + 1, array.length - 1)
  }else{
      return doBinarySearch(array,key,0, minElement - 1)
  }
}

function getMinElementIndex(array) {
  let low = 0,
    high = array.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midElement = array[mid];
    // check if mid is the min element
    const prevIndex = mid - 1;
    const nextIndex = mid + 1;
    // mid is first element
    // mid is last element
    // mid is somewhere inside the array
    const prevElement =
      prevIndex >= 0 ? array[prevIndex] : Number.MAX_SAFE_INTEGER;
    const nextElement =
      nextIndex < array.length ? array[nextIndex] : Number.MAX_SAFE_INTEGER;
    if (midElement < prevElement && midElement < nextElement) {
      return mid;
    }

    // go to left if left is unsorted
    if (array[low] > midElement) {
      high = mid - 1;
    } else if (midElement > array[high]) {
      // go to right if right is unsorted
      low = mid + 1;
    } else {
      // array is sorted on both sides, so we have a sorted sub array now
      // always go to left
      high = mid - 1;
    }
  }
  return -1;
}

function doBinarySearch(array, key, low, high) {
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midElement = array[mid];
    if (midElement === key) {
      return mid;
    }
    if (key < midElement) {
      high = mid - 1;
    }
    if (key > midElement) {
      low = mid + 1;
    }
  }
  return -1;
}

console.log(searchInSortedRotatedArray([4, 5, 6, 7, 0, 1, 2], 0));
console.log(searchInSortedRotatedArray([4, 5, 6, 7, 0, 1, 2], 3));
console.log(searchInSortedRotatedArray([4,5,6,7,0,1,2], 3));
