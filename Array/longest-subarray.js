function longestSubarray(arr) {
    // Write your code here
    const map = new Map();
    let slidingIndex = 0;
    map.set(arr[0],1);
    let finished = false;
    while(slidingIndex < arr.length - 1){
        if(finished){
            break;
        }
        map.set(arr[slidingIndex],1)
        for(let i=slidingIndex;i<arr.length;i++){
            if(i === arr.length - 1){
                finished = true;;
                break;
                
            }
            if(map.has(arr[i+1])){
                map.set(arr[i], map.get(arr[i]) + 1);
            }else{
                map.set(arr[i+1],1);
            }
            map.set(arr[i+1])
            // 2 constraints
            // 1.Frequency must be 2
            // 2. Difference must be <= 1
            const count = map.get(arr[i]);
            const diff = Math.abs(arr[i] - arr[i+1]);
            if(count <= 2 && diff <= 1 && map.size <= 2){
                continue;
            }else{
                map.clear();
                slidingIndex++;
                break;
            }
        
        }
    }
    console.log(map)
    let length = 0;
    map.forEach((value) => length += value)
    return length;
}

console.log(longestSubarray([0,1,2,1,2,3]))