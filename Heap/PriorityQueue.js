/**
 * Priority queue returns elements with  the highest priority first
 */

const MaxHeap = require('./MaxHeap').MaxHeap;

class PriorityQueue {
    constructor() {
        this._maxHeap = new MaxHeap([], true, this._compare);
        this._maxHeap.doMaxHeap();
    }

    enqueue(value, priority) {
        this._maxHeap.insert({value: value, priority: priority});
    }

    dequeue() {
        return this._maxHeap.extractTop()
    }

    isEmpty() {

    }

    _compare(a, b) {
        return a.priority > b.priority;
    }
}

const pq = new PriorityQueue();
pq.enqueue(1, 1);
pq.enqueue(12, 2);
pq.enqueue(4, 3);
pq.enqueue(4, 1);
pq.enqueue(2, 12);
pq.enqueue(5, 11);

console.log(pq.dequeue()); // 12
console.log(pq.dequeue()); // 11
console.log(pq.dequeue()); // 3
console.log(pq.dequeue()); // 2
console.log(pq.dequeue()); // 1
