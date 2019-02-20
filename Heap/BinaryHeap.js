/**
 * Base class for binary heap variations
 */
class BinaryHeap {
    /**
     * 
     * @param {Array} array - Array to convert to a binary heap. Defaults to empty array
     * @param {*function} compareFn - Compare function to apply when comparing array elements.
     * @param {*boolean} lazy - Set to true to prevent creation of max heap at object creation. Defaults to false
     */
    constructor(array = [], lazy, compareFn = null, ) {
        this._array = array;
        this._isHeap = false;
        this._compareFn = compareFn;

    }

    _doHeapCore(array, index) {
        // in a binary tree, the left index of the subtree will be index*2
        //                   the right index of the subtree will be index*2 + 1
        let left = index * 2 + 1,
            right = index * 2 + 2,
            refElement = index;
        // So we start at a node which is a non-leaf and we try to make that subtree as a min/max heap
        if (left <= array.length - 1 && this._invokeCompareFn(array[left], array[index])) {
            refElement = left;
        }
        if (right <= array.length - 1 && this._invokeCompareFn(array[right], array[refElement])) {
            refElement = right;
        }
        if (refElement !== index) {
            // swap the elements in the array
            this._swap(array, index, refElement);

            // call again to handle the next subtree
            this._doHeapCore(array, refElement);
        }
    }

    extractTop() {
        // Maximum element in the max heap is the root or the first element in the array
        // so this should be O(1) operation
        // However when we extract the max, we need to place a new max at the root.
        // for eg: if the max heap is : [9 8 7 1 6 2 5 0]
        // binary tree will be:
        //                  9
        //          8              7
        //     1        6      2        5
        //   0
        // So we will return 9 since thats the maximum element (always at the root)
        // But we need to now write logic to put the next maximum element at the root
        // 1.  Take the last element ie. 0
        // 2. Put the last element at the root and remove the last element from the array
        // 3. Call doHeapCore to start the process of creating heap
        // 4. Return max
        // if (!this._isValidState()) {
        //     return null;
        // }
        const top = this._array[0];
        this._array[0] = this._array.pop();
        this._doHeapCore(this._array, 0);
        return top;
    }

    insert(value) {
        // if (!this._isValidState()) {
        //     this._throwInvalidStateError(this.increaseValue.name);
        // }

        if (value == null) {
            throw new TypeError('value must be defined and not null');
        }

        // insert the new value at the end of the array
        this._array.push(value);
        this._doCompareAndSwap(this._array.length - 1);
        return true;
    }

    delete(value) {

    }

    changeValue(index, value, changeFn) {
        if (!this._isValidState()) {
            this._throwInvalidStateError(this.increaseValue.name);

        }
        if (index < 0 || index > this._array.length) {
            throw new TypeError('index must be non-negative and less than the heap size')
        }
        this._array[index] = changeFn == null ? this._invokeDefaultChangeFn(index, value) :
            Reflect.apply(changeFn, this, [this._array[index], value]);

        this._doCompareAndSwap(index);
        return true;
    }

    /**
     * Sort the array using heap sort
     */
    sort() {
        if (!this._isValidState()) {
            this._throwInvalidStateError(this.sort.name);
        }
        let heapSize = this._array.length;
        let masterArray = [];
        let array =[...this._array];
        while (heapSize > 0) {
            for (let i = Math.ceil((array.length - 1) / 2); i >= 0; i--) {
                this._doHeapCore(array, i);
            }
            heapSize--;
            masterArray.push(array);
            array  = array.slice(1);
        }
        for(let j=0;j<this._array.length;j++){
            this._array[j] = masterArray[j][0];
        }
        return this._array;
    }

    _getKth(k) {
        if (!this._isValidState()) {
            return null;
        }
        for (let i = 1; i < k; i++) {
            this.extractTop();
        }
        return this._array[0];
    }

    _swap(array, i, j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    getArray() {
        return this._array;
    }

    _doCompareAndSwap(index) {
        let parent = this._getParentIndex(index);
        while (index > 0 && this._invokeCompareFn(this._array[index], this._array[parent])) {
            this._swap(this._array, index, parent);
            index = parent;
            parent = this._getParentIndex(index);
        }
    }

    _getParentIndex(index) {
        let i = Math.ceil(index / 2);
        return i > 0 ? i - 1 : i;
    }

    _isValidState() {
        return this._array.length > 1 && this._isHeap;
    }

    _invokeCompareFn(a, b) {
        if (this._compareFn == null) {
            return this._invokeDefaultCompareFn(a, b);
        }
        return Reflect.apply(this._compareFn, this, [a, b]);
    }

    _throwInvalidStateError(fnName) {
        throw new TypeError(`Array is empty or heap is not yet constructed. Call doMaxHeap/doMinHeap function prior to calling ${fnName}`)
    }
}

module.exports = {
    BinaryHeap: BinaryHeap
};