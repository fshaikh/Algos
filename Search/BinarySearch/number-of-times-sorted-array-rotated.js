/**
 You are given a sorted rotated array. Return how many times the sorted array has been rotated
 Example: 
 arr: [3,4,5,1,2]
 Returns: 2

 ALGO:
 Since this is a sorted array which has been rotated, we must use Binary Search
 1. Observe the output closely and see what the usual sorted array would be. One key observation is that
 the minimum element needs to be found. This element will have its previous and next element both greater
 For eg: minimum lement in the exmaple array is 1. Its previous element (5) and next element (2) are both greater
 This is not true for any other element. For eg 4 (3 and 5). 
 So the problem has been reduced to finding minimum element in the array.
 Once we have the minimum lement, its index is the return value

1. low = 0, high = length -1
2. Go to mid element and check if its the minimum element. If it is a minimum element, return its index
      NOTE: Important implementation is to ensure prev index and next index do not go out of bounds
3. If not a mid element, since this is a binary search, we need to go either left or right. How do we decide that?
   Go to the half which is unsorted
 */
function getRotationCount(array){
    let low = 0, high = array.length - 1,mid;
    while(low <= high){
        mid = Math.floor((low + high) / 2);
        if(isMinimumElement(mid)){
            return mid;
        }
        // check which side of mid is unsorted. Since the array is sorted, either half if sorted will have:
        // first element < last element
        if(array[low] > array[mid]){
            //left half is unsorted
            low = mid + 1;
        }
        if(array[mid] < array[high]){
            // right half is unsorted
            high = mid - 1;
        }
        
    }

    function isMinimumElement(mid){
        const prevIndex = mid - 1;// But this can become -1 if mid is the first element, so wrap
        const nextIndex = (mid + 1) % N; // mid + 1 can become > N if mid is last element, so wrap
        return array[mid] < array[prevIndex] && array[mid] > array[nextIndex];
    }
}