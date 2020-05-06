/**
 * Selection Sort is an useful technique when dealing with 'k' minimum categories of problems
 * How it works:
 * 1. Selection Sort is an O(N2)
 * 2. It divides the array into sorted and unsorted parts
 * 3. It looks for minimum element in the unsorted part and adds it to sorted part
 * 
 * How is it useful fin 'k' least/minimjm categories of problems:
 * Consider a problem: Given an array of numbers , find 'k' smallest numbers. For eg: [1,2,4,3,5,6], k = 3, o/p => 2,1,3
 * This is a very common sub-problem in many algorithms and various solutions exists like sort, max heap etc.
 * Since we need 'k' smallest numbers, we can run Selection Sort 'k' number of times and stop. Then we read the first 'k' elements
 * 
 */

 function doSelectionSort(inputArray){
     const length = inputArray.length;
     for(let i=0;i<length;i++){     // N
         let minimumIndex = i;
         for(let j=i+1;j<length;j++){    // N-1
             if(inputArray[j] < inputArray[minimumIndex]){
                 minimumIndex = j;
             }
         }
         if(minimumIndex !== i){
             let temp = inputArray[i];
             inputArray[i] = inputArray[minimumIndex];
             inputArray[minimumIndex] = temp;
         }
     }
     return inputArray;
 }

 console.log(doSelectionSort([4,2,1,3,5,6]));