/**
 * Given an array containing both negative and positive integers.
 *  Find the contiguous sub-array with maximum sum.
 * @param {*} array 
 */
const getMaxSum = (array) => {
    const length = array.length;
    let sum = Number.MIN_SAFE_INTEGER,
        running_sum = 0;
    for(let i=0;i<length;i++){
        running_sum += array[i];
        if(running_sum > sum){
            sum = running_sum;
        }
        if(running_sum < 0){
            running_sum = 0;
        }
    }


    return sum;
};

// [3,-1,4] => 4
// [0,2] =>  2
// [-4,-3] 
// [2,3,-2,4]
// [-2,3-4]

console.log(getMaxSum([-1,-2,-3,-4]));