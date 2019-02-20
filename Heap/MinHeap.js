const BinaryHeap = require('./BinaryHeap').BinaryHeap;

/**
 * Represents a min heap
 */
class MinHeap extends BinaryHeap {
    // #region Constructors
    constructor(array = [], lazy, compareFn) {
        super(array, lazy, compareFn);
        if (array.length > 0 && !lazy) {
            this.doMinHeap(array);
            this._isHeap = true;
        }
    }
    // #endregion Constructors

    // #region Public API
    /**
    * Given an array constructs a min heap
    * @param {*} array 
    */
    doMinHeap(array) {
        for (let i = Math.ceil(array.length / 2) - 1; i >= 0; i--) {
            this._doHeapCore(array, i);
        }
    }

    /**
     * Returns the min element. If heap is empty returns null
     */
    getMin() {
        return this._isValidState() ? this._array[0] : null;
    }
    /**
    * Extracts the minimum element from the min heap
    */
    extractMin() {
        return super.extractTop();
    }

    /**
    * Get the kth smallest element from the array
    * @param {*} k 
    */
    getKthSmallest(k) {
        return super._getKth(k);
    }

    /**
     * Decrease the element at specfied index by the provided key value
     * @param {*number} index 
     * @param {*any} value 
     */
    decreaseValue(index, value, decreaseFn = null) {
        return super.changeValue(index, value, decreaseFn);
    }

    /**
     * Inserts a new value into min heap
     * @param {*any} value - New value to be inserted into the heap
     */
    insert(value) {
        return super.insert(value);
    }

    /**
     * Deletes the value from min heap if present.
     * @param {*any} value - Value to be deleted from the heap
     */
    delete(value) {
        // call increase key to make the value maximum
    }

    /**
     * Sort the array using heap sort
     */
    sort() {
        super.sort();
    }

    // #endregion Public API

    // #region Private Methods

    _invokeDefaultCompareFn(a, b) {
        return a < b;
    }

    _invokeDefaultChangeFn(index, value) {
        return Math.abs(this._array[index] - value);
    }
    // #endregion Private  Methods
}

module.exports = MinHeap;

const minHeap = new MinHeap([4,5,2,3,1],false);
console.log(minHeap.getArray());







