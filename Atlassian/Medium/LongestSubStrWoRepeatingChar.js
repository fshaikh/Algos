var lengthOfLongestSubstring = function(s) {
    if(s == null || s.length === 1){
        return 1;
    }
    const map = new Map();
    let backPtr = 0, nextPtr = backPtr+1, runningLength = 1,maxLength = 1;
    map.set(s[backPtr],0);
    
    while(backPtr < s.length || nextPtr < s.length){
        if(!map.has(s[nextPtr])){
            runningLength++;
            map.set(s[nextPtr]);
            nextPtr++;
            continue;
        }
        if(runningLength >= maxLength){
            maxLength = runningLength;
            runningLength = 1;
        }
        backPtr = nextPtr+1;
        nextPtr = backPtr + 1;
        map.clear();
        map.set(s[backPtr],0);
    }
    
    return maxLength;
};
console.log(lengthOfLongestSubstring("pwwkew"));