/**
You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Note: Given n will be a positive integer.

Example 1:

Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 */

var climbStairs = function(n) {
    const dp = [];
    for(let i=0;i<=n+1;i++){
        dp[i] = -1;
    }
    return doClimbing(0);

    function doClimbing(m){
        if(dp[m] !== -1){
            return dp[m]
        }
        if(m > n){
            return 0;
        }
        
        if(m === n){
            return 1;
        }
        const oneStep = doClimbing(m + 1);
        const twoStep = doClimbing(m + 2);
        dp[m+1] = oneStep;
        dp[m+2] = twoStep;
        return oneStep + twoStep;
    }
};

console.log(climbStairs(2));