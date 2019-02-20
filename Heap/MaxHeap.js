const BinaryHeap = require('./BinaryHeap').BinaryHeap;
/**
 * Class represents a  max binary heap
 */
class MaxHeap extends BinaryHeap{
    /**
     * 
     * @param {Array} array - Array to convert to a max heap. Defaults to empty array
     * @param {*function} compareFn - Compare function to apply when comparing array elements. If no compare function is supplied
     *                        it will execute a > operator on the array elements being compared. Compare function must of
     *                        the following signature: const compareFunc = (elementA, elementB): boolean. Must return elementA > elementB
     *          
     * @param {*boolean} lazy - Set to true to prevent creation of max heap at object creation. Defaults to false
     */
    constructor(array = [], lazy, compareFn = null, ) {
        super(array,lazy,compareFn);
        // if array is non-empty and we want to do the heap now, do the heap
        if (array.length > 1 && !lazy) {
            this.doMaxHeap();
            this._isHeap = true;
        }
    }
    // #region Public API
    /**
     * Given an array constructs a max heap
     */
    doMaxHeap() {
        // We should think about heaps in terms of a binary tree. Max heap has 2 properties:
        // 1. Heap is a complete or almost complete binary tree with left most nodes filled first
        // 2. Root is always greater than the children and this applies recursively

        // So we should take the array and visualize it as a binary tree. 
        // For eg: array = [9, 6, 5, 0, 8, 2, 7, 1]
        // We construct a binary tree as below
        //             9
        //        6         5
        //     0    8     2    7
        //   1
        // What we have done is taken the first element of array as root, then just filled the 
        // tree so that its a binary tree (complete or almost complete)

        // Now, we give each node an index, starting with 1 and so on.
        // For a tree of 'n' nodes, leaf nodes will be from : (n/2 + 1 ) to n
        //                          non-leaf nodes from : n/2 to 1
        // Each leaf node is already a max-heap. For eg: the leaf nodes in the above tree
        // are: n/2 +1 to n i.e 8/2 + 1 = 5 to 8 [ 8,2,7,1]
        // Non leaf nodes are: n/2 to 1 = 8/2 to 1 = 4 to 1 [0,5,6,9]

        // Since each leaf node is already a max heap, we start from the first non-leaf node with 
        // largest index. 
        // For eg: 0 (4), 5(3), 6(2), 9(1)
        // So the first non-leaf node with the largest index is 0. 
        // And we keep doing the operation till we reach the root node i.e we start from
        // n/2 -> 1

        for (let i = Math.ceil((this._array.length / 2)) - 1; i >= 0; i--) {
            this._doHeapCore(this._array, i);
        }
    }

    /**
     * Returns the max element. If heap is empty returns null
     */
    getMax() {
        return this._isValidState() ? this._array[0] : null;
    }
    /**
    * Extracts the maximum element from the max heap
    */
    extractMax() {
        return super.extractTop();
    }

    /**
    * Get the kth smallest element from the array
    * @param {*} k 
    */
    getKthLargest(k) {
        return super._getKth(k);
    }

    /**
     * Increase the element at specfied index by the provided key value
     * @param {*number} index 
     * @param {*any} value 
     */
    increaseValue(index, value, increaseFn = null){
        return super.changeValue(index,value,increaseFn);
    }

    /**
     * Inserts a new value into max heap
     * @param {*any} value - New value to be inserted into the heap
     */
    insert(value) {
        return super.insert(value);
    }

    /**
     * Deletes the value from max heap if present.
     * @param {*any} value - Value to be deleted from the heap
     */
    delete(value){
        // call increase key to make the value maximum
    }

    /**
     * Sort the array using heap sort
     */
    sort(){
        super.sort();
    }

    // #endregion Public API

    // #region Private Methods
    
    _invokeDefaultCompareFn(a,b){
        return a > b;
    }

    _invokeDefaultChangeFn(index,value){
        return this._array[index] + value;
    }
    // #endregion Private  Methods
}

module.exports = {
    MaxHeap: MaxHeap
};