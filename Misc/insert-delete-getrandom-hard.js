/**
 Design a data structure that supports all following operations in average O(1) time.

Note: Duplicate elements are allowed.
insert(val): Inserts an item val to the collection.
remove(val): Removes an item val from the collection if present.
getRandom: Returns a random element from current collection of elements. The probability of each element being returned is linearly related to the number of same value the collection contains.
Example:

// Init an empty collection.
RandomizedCollection collection = new RandomizedCollection();

// Inserts 1 to the collection. Returns true as the collection did not contain 1.
collection.insert(1);

// Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
collection.insert(1);

// Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
collection.insert(2);

// getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
collection.getRandom();

// Removes 1 from the collection, returns true. Collection now contains [1,2].
collection.remove(1);

// getRandom should return 1 and 2 both equally likely.
collection.getRandom();
 */

 /**
 * Initialize your data structure here.
 */
var RandomizedCollection = function() {
    this.map = new Map();
    this.valuesArray = [];
};

/**
 * Inserts a value to the collection. Returns true if the collection did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
    const mapEntry = this.map.get(val);
    this.valuesArray.push(val);
    const index = this.valuesArray.length - 1;
    if(!mapEntry){
        const indexArray = [index];
        const indexMap = new Map();
        indexMap.set(index,indexArray.length - 1)
        this.map.set(val, {indexArray , indexMap})
    }else{
        mapEntry.indexArray.push(index);
        mapEntry.indexMap.set(index,mapEntry.indexArray.length - 1)
    }

    return mapEntry === undefined;
};

/**
 * Removes a value from the collection. Returns true if the collection contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
    const mapEntry = this.map.get(val);
    if(!mapEntry){
        return false;
    }
    const lastIndex = this.valuesArray.length - 1;
    // 1. Get index of val
    const index = mapEntry.indexArray.pop();
    // 2. Remove the value from valuesArray at index
    if(index !== lastIndex){
        this.valuesArray[index] = this.valuesArray[lastIndex];
        // 3. Adjust the moved value
        const mapEntry2 = this.map.get(this.valuesArray[lastIndex]);
        const oldIndex = mapEntry2.indexMap.get(lastIndex);
        mapEntry2.indexArray[oldIndex] = index;
        mapEntry2.indexMap.delete(lastIndex);
        mapEntry2.indexMap.set(index,oldIndex)
    }
    this.valuesArray.pop();
    // 4. 
    mapEntry.indexMap.delete(index);
    if(mapEntry.indexArray.length === 0){
        this.map.delete(val)
    }

    return true;
};

/**
 * Get a random element from the collection.
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function() {
    const index = Math.floor(Math.random() * this.valuesArray.length);
    return this.valuesArray[index];
};

/** 
 * Your RandomizedCollection object will be instantiated and called as such:
 * 
 * 
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
var obj = new RandomizedCollection()
console.log(obj.insert(1))
console.log(obj.insert(1))
console.log(obj.insert(2))
console.log(obj.getRandom())
console.log(obj.remove(1));
console.log(obj.getRandom())
console.log(obj.insert(3))
console.log(obj.insert(1))
console.log(obj.insert(2))
console.log(obj.insert(4))
console.log(obj.getRandom())
console.log(obj.remove(1));
console.log(obj.remove(3));
// console.log(obj.insert(10))
// console.log(obj.insert(10))
// console.log(obj.insert(20))
// console.log(obj.insert(20))
// console.log(obj.insert(30))
// console.log(obj.insert(30))

// console.log(obj.remove(10));
// console.log(obj.remove(10));
// console.log(obj.remove(30));
// console.log(obj.remove(30));
// for(let i=0;i<10;i++){
//     console.log(obj.getRandom())
// }

console.log(obj.map);
console.log(obj.valuesArray)


