function getLCS(str1, str2){
    // create a 2D-matrix for memoization.
    const str1Len = str1.length, str2Len = str2.length
    const dp = [];
    for(let i=0;i<=str1Len;i++){
        dp[i] = [];
        for(let j=0;j<=str2Len;j++){
           if(i === 0  || j === 0){
               dp[i].push(0);
           }else{
               dp[i].push(-1);
           }
           
        }
    }
    return doLCS(str1Len, str2Len);
    function doLCS(str1Index, str2Index){
        // base condition - smallest valid input. 
        if(str1Index === 0 || str2Index === 0){
            return 0;
        }
        // see the dp table if result is memoized for [str1Index][str2Index]
        if(dp[str1Index][str2Index] !== -1){
            return dp[str1Index][str2Index]
        }
        
        // Choice diagram
        // 1. When both the char at the index are same. We have found one common character
        if(str1[str1Index-1] === str2[str2Index-1]){
            // Add 1 since we have found one common character and call by decrementing both indices
            const count = 1+ doLCS(str1Index-1, str2Index-1);
            // memoize the result
            dp[str1Index][str2Index] = count;
            return count;
        }else{
            // Now we have 2 choice: Take the entire str1 and reduce one from str2 or
            // reduce one from str1 and take the entire str2.
            // Since the problem is asking for longest (maximisation), return max
            const count = Math.max(doLCS(str1Index, str2Index-1), doLCS(str1Index-1, str2Index));
            // memoize the result
           dp[str1Index][str2Index] = count;
            return count;
        }
        
    }
}