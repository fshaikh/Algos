function binarySearch(array,target){
    const index = doBinarySearchCore(array, target, 0, array.length);
    if(index === -1){
        return [-1,-1];
    }
    let prevIndex = index,nextIndex = index;
    while(prevIndex > 0 && array[prevIndex] === target){
        --prevIndex;
    }
    while(nextIndex < array.length -1 && array[nextIndex] === target){
        ++nextIndex;
    }
    return [prevIndex,nextIndex];
    // start = 0, end = 5
    // take a pivot element = start + end / 2 [5/2 = 2]
    // compare
    // if target = array[pivot], return pivot
    // if target > array[pivot], do binary search on right side
    // if target < array[pivot], do binary search on left side
}

function doBinarySearchCore(array, target, start, end){
    let pivot = Math.floor((start + end)/2);
    if(start > end){
        return -1;
    }
    if(target === array[pivot]){
        return pivot;
    }
    else if(target < array[pivot]){
        return doBinarySearchCore(array,target,start,--pivot);
    }
    else if(target > array[pivot]){
        return doBinarySearchCore(array,target,pivot+1,end)
    }
     else{
         return -1;
     }
}

  console.log(binarySearch([5,7,7,8,8,10],8)); // 3
  console.log(binarySearch([5,7,7,8,8,10],6)); // -1
 console.log(binarySearch([1,2,3,4,5],5)); // -1

 var maxSubArray = function(nums) {
    let sum = Number.MIN_VALUE,
        runningSum = 0;
    for (let index = 0; index < nums.length; index++) {
            runningSum += nums[index];
            if(runningSum > sum){
                sum = runningSum
            }
    }
    return sum;
};