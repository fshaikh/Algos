/**
 * Represents a FIFO queue data structure
 */
class Queue {
    constructor(){
        this._storage = [];
    }

    enqueue(value){
        this._storage.push(value);
    }

    dequeue(){
        if(this._storage.length === 0){
            return null;
        }
        const value = this._storage[0];
        this._storage.splice(0,1);
        return value;
    }

    isEmpty(){
        return this._storage.length === 0;
    }

    [Symbol.iterator] (){
        let context = this;
        return {
            next: function(){
                if(!queue.isEmpty()){
                    return{
                        value: context.dequeue(),
                        done: false
                    }
                }
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}

module.exports = {
    Queue: Queue
};

const queue = new Queue();
queue.enqueue(4);
queue.enqueue(2);
queue.enqueue(1);
queue.enqueue(3);


for(let value of queue){
    console.log(value)
}