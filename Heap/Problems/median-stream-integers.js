/**
 Given a stream of integers, design data structure which provides to functions
 addNumber(value) => Adds the value from the stream
 computeMedian() => Returns median of the data received from the stream so far

 Median is computed on a sorted array. For eg: [1,2,3,4,5]. Median  = middle element = 3, since the number of elements is odd
 [1,2,3,4]. Median = 2+3/2 = 2.5, since it has even number of elements, so we take middle two elements
 */

 //#region Approach 1: Heap
 // Algorithm:
 // 1. Maintian two heaps: min heap and max heap
 // Add first 2 elements to each of the heap
 // 2. When a new element arrives,  
 //      if new element < root of max heap, add to min heap. 
 //      Else add to max heap
 // 3. Rebalance: If difference in size of the two heaps > 1, do rebalance: move the root of minHeap to maxHeap
 // 4. Compute median: 
 //      If 2 heaps are of the same size: root1 + root2 / 2
 //      Else, return the root of min heap

 // Eg: 1, 15
 // min heap : 15
 // max heap : 1

 // 8.  8 > root(maxHeap), so add to min heap
 // min heap : 8 15
 // max heap : 1
 // Rebalance is not required as diff is 1 which is not greater than 1
 // Median is 8. Since they are of different size

 // 4
 // 4 > root(maxHeap), so add to min heap
 // min heap : 4 8 15
 // max heap : 1
 // Rebalance is required as diff is 2 which is not greater than 1. Move 4 to max heap
 // min heap : 8 15
 // max heap : 4 1
 // Median is 8 + 4 / 2 = 6. Since they are of same size

 //#endregion Approach 1: Heap