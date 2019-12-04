/**
Given an array nums and a value val, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

Example 1:

Given nums = [3,2,2,3], val = 3,

Your function should return length = 2, with the first two elements of nums being 2.

It doesn't matter what you leave beyond the returned length.
Example 2:

Given nums = [0,1,2,2,3,0,4,2], val = 2,

Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.

Note that the order of those five elements can be arbitrary.

It doesn't matter what values are set beyond the returned length.
Clarification:

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

// nums is passed in by reference. (i.e., without making a copy)
int len = removeElement(nums, val);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
 */

var removeElement = function(array, target) {
    // get the count of the target element
    const c = array.reduce((count, value) => {
       if (value === target) {
           count++;
       }
       return count;
   }, 0);

   const newLength = 2*array.length - c;
   const oldLength = array.length;
// Expand the array to fit the new elements
array.length = newLength;


// Move non-target items to start of the expanded array
   for (let i = 0, j = oldLength; i < oldLength; i++) {
       const element = array[i];
       if (element !== target) {
           array[j++] = element;
       }
   }

   // Remove elements from start till the original length. This will leave only the non-target elements
//     // as they have been moved to start of the new expanded slots
   array.splice(0, oldLength);
   return c;
};

const swap = (array,index1,index2) => {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}
var removeElementWith2Pointers = function(array,target){
    let start = 0, end = array.length - 1;
    while(start < end){
        const startValue = array[start],
              endValue = array[end];
        if(startValue === target && endValue !== target){
            swap(array,start,end);
            start++;
            end--;
        }
        else if(startValue === target && endValue === target){
            end--;
        }
        else if(startValue !== target && endValue === target){
            start++;
            end--;
        }
        else {
            start++;
        }
    }
    const delIndex = array[start] === target ? start: start+1
     array.splice(delIndex,array.length);
}

const removeElementFast = function(array,target){
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(element === target){
            array.splice(index,1);
            index--;
        }
    }
}
let array = [1,1]

removeElementFast(array, 1);
console.log(array)
