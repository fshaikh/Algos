/**
Given a non-empty array containing only positive integers,
find if the array can be partitioned into two subsets such that
the sum of elements in both subsets is equal.

Note:

Each of the array element will not exceed 100.
The array size will not exceed 200.
 

Example 1:

Input: [1, 5, 11, 5]

Output: true

Explanation: The array can be partitioned as [1, 5, 5] and [11].
 

Example 2:

Input: [1, 2, 3, 5]

Output: false

Explanation: The array cannot be partitioned into equal sum subsets.
 */

 /**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    if(nums == null || nums.length === 0){
        return false;
    }
    if(nums.length === 1){
        return 0;
    }
    
    const totalSum = nums.reduce((sum,value) => sum + value);
    if(totalSum % 2 !== 0){
        return false;
    }
    const dp = [], newSum = totalSum/2;
    
    for(let i=0;i<=nums.length;i++){
        dp[i] = [];
        for(let j=0;j<=newSum;j++){
            if(i === 0 && j === 0){
                dp[i].push(true)
            }
            else if(j === 0){
                dp[i].push(true)
            }
            else if(i === 0){
                dp[i].push(false);
            }else{
                dp[i].push(-1)
            }
        }
    }
    return isSubsetSum(newSum, nums.length-1);
    
    function isSubsetSum(sum,index){
        if(sum === 0 ){
            return true;
        }
        if(index === 0){
            return false;
        }
        if(dp[index][sum] !== -1){
            return dp[index][sum];
        }
        if(nums[index] > sum){
            const response =  isSubsetSum(sum, index - 1);
            dp[index][sum] = response;
            return response
        }else{
            const response =   isSubsetSum(sum - nums[index], index - 1) ||
                   isSubsetSum(sum, index - 1);
            dp[index][sum] = response;
            return response
        }
    }
};