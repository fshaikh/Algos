/**
 * Initialize your data structure here.
 */
var TimeMap = function() {
    this.map = new Map();
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
    // key does not exist
    if(!this.map.has(key)){
        this.map.set(key,[{value, timestamp}])
    }else{
        this.map.get(key).push({value,timestamp})
    }
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, queriedTimestamp) {
    if(!this.map.has(key)){
        return "";
    }
    // do a binary search 
    const timestampedValues = this.map.get(key);
    if(timestampedValues.length === 1){
        return timestampedValues[0].timestamp <= queriedTimestamp ? timestampedValues[0].value : "";
    }
    let low = 0, high = timestampedValues.length - 1;
    while(low < high){
        let mid = Math.floor((high + low)/2);
        const {value,timestamp} = timestampedValues[mid];
        if(timestamp === queriedTimestamp){
            return value;
        }
        if(queriedTimestamp < timestamp){
            high = mid-1;
        }
        if(queriedTimestamp > timestamp){
            low = mid+1;
        }  
    }
    return queriedTimestamp > timestampedValues[low].timestamp  ? "": timestampedValues[low].value;
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
var obj = new TimeMap()
obj.set("love","high",10)
obj.set("love","low",20)
console.log(obj.get("love",5));
console.log(obj.get("love",10));
console.log(obj.get("love",15));
console.log(obj.get("love",20));
console.log(obj.get("love",25));
