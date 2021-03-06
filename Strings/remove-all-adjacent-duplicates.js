/**
 * Given a string S of lowercase letters, a duplicate removal consists of choosing two adjacent and equal letters, and removing them.

We repeatedly make duplicate removals on S until we no longer can.

Return the final string after all such duplicate removals have been made.  It is guaranteed the answer is unique.

 

Example 1:

Input: "abbaca"
Output: "ca"
Explanation: 
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
 

Note:

1 <= S.length <= 20000
S consists only of English lowercase letters.
 */
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
var removeDuplicates = function(S) {
    const stack = new Stack();
    for(let i=0;i<S.length;i++){
        const item = S[i];
        const stackTop = stack.peek();
        if(item === stackTop){
            stack.pop();
        }else{
            stack.push(item)
        }
    }
    let result = '';
    for(let s of stack){
        result = s + result;
    }
    return result;
};

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicatesWithK = function(s, k) {
    function Pair(count, ch){
        this.count = count;
        this.ch = ch;
    }
    
    const stack = new Stack();
    for(let i=0;i<s.length;i++){
        if(stack.isEmpty() || s[i] !== stack.peek().ch){
            stack.push(new Pair(1, s[i]))
        }else{
            if(++stack.peek().count === k){
                stack.pop()
            }
        }
    }
    let str = '';
    while(!stack.isEmpty()){
        const pair = stack.pop();
        for(let i=0;i<pair.count;i++){
            str = pair.ch + str;
        }
    }
    return str;
};
console.log(removeDuplicatesWithK("dtpdtaaaaaaaaappppppppppppppppppppaaaaaaaaaaxxxxxxxxxxxxxxsssssssssjjjjjjjjjjjjjjjjjjjjxxxxxxxxxxxxxxxxxxxxsssssssjjjjjjjjjjjjjjjjjjjjssssxxxxxxatdwvvpctpggggggggggggggggggggajagglaaaaaaaaaaaaaaaaaaaa",20))

