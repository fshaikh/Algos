var lengthOfLongestSubstring = function(s) {
    let length = 0,low=0,high = 0;
    const map = new Map();

    while(high < s.length){
        const isSeen = map.has(s[high]);
        if(isSeen){
            if(length < map.size){
                length = map.size;
            }
            map.clear();
            low = low + 1;
            high = low;
        }else{
            map.set(s[high], high);
            high++;
        }
    }
    return Math.max(length,map.size);
};

console.log(lengthOfLongestSubstring('abcabcdabcde'));