/**
 * Given an array of numbers , find 'k' smallest numbers. For eg: [4,1,2,3,5,6], k = 3, o/p => 2,1,3
 * This is a very common sub-problem in many algorithms and various solutions exists like sort, selection sort, max heap etc.
 */

 /**
  * Method 1: Use a normal sort to sort in ascending order and return first k elements
  * Time Complexity: O(NlogN) + O(k) => O(NlogN)
  * @param {*} array 
  * @param {*} k 
  */
 function findkSmallestUsingSort(array,k){
     return array.sort((a,b) => a - b).slice(0,k);
 }

  /**
  * Method 2: Use selection sort. Do selection sort till k elements  and return first k elements
  * Time Complexity: O(N2)
  * @param {*} array 
  * @param {*} k 
  */
 function findkSmallestUsingSelectionSort(array,k){
    for(let i=0;i<array.length;i++){
        if(i === k){
            break;
        }
        let minimumIndex = i;
        for(let j=i+1;j<array.length;j++){
            if(array[j] < array[minimumIndex]){
                minimumIndex = j
            }
        }
        if(minimumIndex !== i){
            let temp = array[i];
            array[i] = array[minimumIndex];
            array[minimumIndex] = temp;
        }
    }
    console.log(array)
    return array.slice(0,k);
}

/**
 * Method 3: Use max heap of size k. Return all k elements of the max heap
 * Time Complexity: O(k) + O((n-k)logk)
 * Algo:
 * 1. Construct a max heap of size k by taking the first k elements of the array    O(k)
 * 2. Start from k till length - 1                                                  (n - k)
 * 3.    if array[k] < maxHeap.top(), replace top with array[k]. And heapify.       O(logk)
 *       if array[k] > maxHeap.top(), continue to next array element
 * 4. Get all k elements of max heap which will be the k smallest elements
 */
const MaxHeap = require('../Heap/MaxHeap').MaxHeap;

function findkSmallestUsingMaxHeap(array,k){
    let maxHeap = new MaxHeap(array.slice(0,k), false);
    console.log(maxHeap.getArray());
    for(let i=k;i<array.length;i++){
        if(array[i] > maxHeap.getMax()){
            continue;
        }
        maxHeap.increaseValue(0,array[i],(index,value) => array[i])
        console.log(maxHeap.getArray());
    }
    return maxHeap.getArray();
}


 console.log(findkSmallestUsingMaxHeap([4,2,1,3,5,0,8],2));



 // Kth smallest Elements         Sort/Selection Sort/max-heap
 // Kth Largest Elements          Sort/min-heap
 // Kth Largest Element           Sort/min-heap (return the top)
 // Kth Smallest Element           Sort/max-heap (return the top)