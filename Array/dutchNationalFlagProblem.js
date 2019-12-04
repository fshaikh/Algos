/**
 * Given an array of 0, 1 and 2's sort the array in ascending order such that:
 *  in place
 *  in linear time O(N)
 *  without any extra space (such as creating an extra array).
 *  Example:
 *  input array is [2,0,0,1,2,1]  output [0,0,1,1,2,2] 
 */

 // Other solutions are:
 // 1. Simple approach
 // 2. Counting sort
 function swap(array,i,j){
     const temp = array[i];
     array[i] = array[j];
     array[j] = temp;
 }

 function sort(array){
     let low = 0,
         mid = 0,
         high = array.length - 1;
    while(mid < high){
        const value = array[mid];
        switch(value){
            case 0:
                swap(array,low++,mid++);
                break;
            case 1:
                mid++;
                break;
            case 2:
                swap(array,mid,high--);
                break;
        }
    }
    return array;
 }

 console.log(sort([1,1,1,0,0,2,0]));


