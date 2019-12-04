
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function(arr) {
    //  sort the array
    arr.sort((a,b) => a-b);
    //  find difference between consecutive elements.
    let minDiff = Math.abs(arr[0] - arr[1]);
    const map = new Map();
    map.set(minDiff,[[arr[0],arr[1]]])
    for(let i=1;i<arr.length;i++){
        const diff = Math.abs(arr[i] - arr[i+1]);
        if(diff === minDiff){
            if(map.has(diff)){
                map.get(diff).push([arr[i],arr[i+1]]);
                continue;
            }
            map.set(diff,[[arr[i],arr[i+1]]]);
            continue;
        }
        if(diff < minDiff){
            minDiff = diff;
            map.clear();
            map.set(diff,[[arr[i],arr[i+1]]]);
        }
    }
    return map.get(minDiff);
};
console.log(minimumAbsDifference([40,11,26,27,-20]))