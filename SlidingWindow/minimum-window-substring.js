/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if(s === "" || t === ""){
        return "";
    }
    let left = 0, right = 0;
    let window = {
        start: 0, end: 0,
        size: 0
    }
    const tFrequencyMap = new Map();
    for(let i=0;i<t.length;i++){
        let count = tFrequencyMap.get(t[i]) || 0;
        tFrequencyMap.set(t[i],count + 1);
    }
    while(right < s.length){
        // does the window contained within l and r contain t?
        if(!contains(left,right,s,t)){
            right++;
        }else{
            const windowSize = right - left + 1;
            if(window.size === 0 || window.size > windowSize){
                window.size = windowSize;
                window.start = left;
                window.end = right;
            }
            left++;
        }
    }
    if(window.size === 0){
        return "";
    }
    return s.substring(window.left,window.right)
    
    function contains(start, end){
    if(start === end || end - start + 1 < t.length){
        return false;
    }
    const sub = s.substring(start,end+1);
    const frequencyMap = new Map();
    for(let i=0;i<sub.length;i++){
        let count = frequencyMap.get(sub[i]) || 0;
        frequencyMap.set(sub[i],count + 1);
    }
    for(let [key,value] of tFrequencyMap.entries()){
        if(!frequencyMap.has(key)){
            return false;
        }
        if(frequencyMap.get(key) !== value){
            return false;
        }
    }
    return true;
}
};

const S = "ADOBECODEBANC", T = "ABC";
console.log(minWindow(S,T))