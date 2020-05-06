class Stack {
    constructor(){
        this._storage = [];
        this._currentIndex = -1;
    }

    push(value){
        this._storage.push(value);
        this._currentIndex += 1;
        return value;
    }

    pop(){
        if(this.isEmpty()){
            return -1;
        }
        const value = this._storage[this._currentIndex];
        this._storage.pop();
        this._currentIndex -= 1;
        return value;
    }

    peek(){
        return this._storage[this._currentIndex];
    }

    isEmpty(){
        return this._storage.length === 0 ? true : false;
    }

    get Length(){
        return this._storage.length;
    }

    [Symbol.iterator]() {
        let context = this;
        return {
            next: function(){
                let value = context.pop();
                if(value === -1){
                    return {
                        done: true,
                        value: undefined
                    }
                }else{
                    return {
                        done: false,
                        value: value
                    };
                }
            }
        };
    }
}

module.exports = {
    Stack: Stack
};

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(13);
stack.push(14);


// for(let item of stack){
//     console.log(item);
// }