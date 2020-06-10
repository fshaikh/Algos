/**
 Design a hit counter which counts the number of hits received in the past 5 minutes.

Each function accepts a timestamp parameter (in seconds granularity) 
and you may assume that calls are being made to the system in chronological order
 (ie, the timestamp is monotonically increasing). You may assume that the earliest timestamp starts at 1.

It is possible that several hits arrive roughly at the same time.

Example:

HitCounter counter = new HitCounter();

// hit at timestamp 1.
counter.hit(1);

// hit at timestamp 2.
counter.hit(2);

// hit at timestamp 3.
counter.hit(3);

// get hits at timestamp 4, should return 3.
counter.getHits(4);

// hit at timestamp 300.
counter.hit(300);

// get hits at timestamp 300, should return 4.
counter.getHits(300);

// get hits at timestamp 301, should return 3.
counter.getHits(301); 
Follow up:
What if the number of hits per second could be very large? Does your design scale?
 */

 //#region Queue-based approach
 // TC: O(N), SC: O(N)
 /**
 * Initialize your data structure here.
 * 
 */
var HitCounter = function() {
    this.queue = [];
    this.INTERVAL = 300;
};

/**
 * Record a hit.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function(timestamp) {
    this.queue.push(timestamp);
};

/**
 * Return the number of hits in the past 5 minutes.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function(timestamp) {
    const lowerRange = timestamp <= this.INTERVAL ? 0 : timestamp - this.INTERVAL;
    const higherRange = timestamp > this.INTERVAL ? timestamp : this.INTERVAL;
    return this.queue.filter(hit => hit > lowerRange && hit <= higherRange).length
};

/** 
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */
 //#endregion Queue-based approach

 //#region - Constant-time approach
 /**
 * Initialize your data structure here.
 */
var HitCounter = function() {
    this.timestamps = [];
    this.hitsArray = [];
    this.INTERVAL = 300;
};

/**
 * Record a hit.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function(timestamp) {
    const index = timestamp % this.INTERVAL;
    if(this.timestamps[index] !== timestamp){
        this.timestamps[index] = timestamp;
        this.hitsArray[index] = 1;
    }else{
        this.hitsArray[index] = this.hitsArray[index] + 1;
    }
    
};

/**
 * Return the number of hits in the past 5 minutes.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function(timestamp) {
    let hitsCount = 0;
    const lowerRange =  timestamp <= this.INTERVAL ? 0 : timestamp - this.INTERVAL;
    const higherRange = timestamp > this.INTERVAL ? timestamp : this.INTERVAL;
    for(let i=0;i<this.timestamps.length;i++){
        const value = this.timestamps[i];
        if((value > lowerRange && value <= higherRange)){
            hitsCount += this.hitsArray[i]
        }
    }
    return hitsCount;
    
    
};


 //#endregion