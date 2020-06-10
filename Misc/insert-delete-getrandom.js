/**
 * Design a data structure that supports all following operations in average O(1) time.

insert(val): Inserts an item val to the set if not already present.
remove(val): Removes an item val from the set if present.
getRandom: Returns a random element from current set of elements.
 Each element must have the same probability of being returned.
Example:

// Init an empty set.
RandomizedSet randomSet = new RandomizedSet();

// Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomSet.insert(1);

// Returns false as 2 does not exist in the set.
randomSet.remove(2);

// Inserts 2 to the set, returns true. Set now contains [1,2].
randomSet.insert(2);

// getRandom should return either 1 or 2 randomly.
randomSet.getRandom();

// Removes 1 from the set, returns true. Set now contains [2].
randomSet.remove(1);

// 2 was already in the set, so return false.
randomSet.insert(2);

// Since 2 is the only number in the set, getRandom always return 2.
randomSet.getRandom();
 */


//#region O(N) for getRandom
/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
    this.set = new Set();
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    this.set.add(val);  
    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if(!this.set.has(val)){
        return false;
    }
    this.set.delete(val);
    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const random = Math.ceil(Math.random(0,1)*100 % this.set.size);
    const iterator = this.set.entries();
    let index = 0;
    for (let entry of iterator) {
        if(index === random){
            return entry[0]
        }
      index++;
    }
};
//#endregion O(N) for getRandom
// Algorithm:
// In the above approach, getRandom is O(1). In getRandom ,we need an index which we get by calling Math.random()
// However, there is no index-based lookup in Set. So, to make getRandom O(1), we need to do an index-based
// lookup which is also O(1). Map/Set data structures will not provide this. The only data structure which can 
// provide O(1) lookup in an array. So we need an array which holds the values. That solves getRandom
// Now if we just use an array to hold values, insert/remove will not be O(1). Which data structure provides
// O(1) insertion and deletion? We can use Map. So we use 2 data structures:
// Array => Stores all values passed in insert function
// Map (key = val, value = index of val in array)

// Insert :
// 1. If val exists,return false O(1)
// 2. If val does not exist:
//      Push val to array
//      add to map. value is array.index - 1 , since we are pushing val to array

// Remove:
// NOTE: This is a bit tricky , so pay extra attention
// 1. If val doesn not exist,return false O(1)
// 2. To remove an element from array, we generally use splice. But splice is not a O(1). So, how do we remove an 
//    element from array in O(1). 
//    a. Move last element of the array to the index
//    b. Update index of last element in map O(1)
//    c. Pop from array. This will remove the last element O(1)
//    d. Remove val from map O(1)

//#region O(1)

var RandomizedSet = function() {
    this.map = new Map();
    this.indexArray = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if(this.map.has(val)){
        return false;
    }
    this.indexArray.push(val);
    this.map.set(val, this.indexArray.length - 1);
    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if(!this.map.has(val)){
        return false;
    }
    const index = this.map.get(val);
    const lastElement = this.indexArray[this.indexArray.length - 1];
    // 1. Move last element to index . O(1)
    this.indexArray[index] = lastElement;
    // 2. Update index of last element in map O(1)
    this.map.set(lastElement,index);
    // 3. Pop from array. This will remove the last element O(1)
    this.indexArray.pop();
    // 4. Remove val from map O(1)
    this.map.delete(val);
    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const random = Math.floor(Math.random() * this.indexArray.length);
    return this.indexArray[random]
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
//#endregion O(1)


