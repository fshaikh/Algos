/**
 * Given an expression string exp,
 *  Examine whether the pairs and the orders of “{“,”}”,”(“,”)”,”[“,”]” are correct in exp.
For example, the program should print 'balanced' for exp = “[()]{}{[()()]()}” and 'not balanced' for exp = “[(])”

Input:
 */
class Stack {
    constructor() {
        this.storage = [];
        this.currentIndex = -1;
    }
    push(value) {
        this.storage.push(value);
        this.currentIndex++;
    }
    pop() {
        if (this.isEmpty()) {
            return -1;
        }
        var value = this.peek();
        this.storage.splice(this.currentIndex, 1);
        this.currentIndex--;
        return value;
    }
    peek() {
        return this.storage[this.currentIndex];
    }
    isEmpty() {
        return this.storage.length === 0;
    }
    length() {
        return this.storage.length;
    }
}
const isExpressionBalanced = (expression) => {
    var stack = new Stack();
    for(let i=0;i<expression.length;i++){
        const element = expression[i]
        if(isOpening(element)){
            stack.push(element);
        }else{
            // If the stack is empty and we have a closing bracket, its unbalanced
            if(stack.isEmpty()){
                return false;
            }
            // Pop the bracket from the stack. 
            const val = stack.pop();
            // Check if it matches with the current closing bracker
            const isValid = isMatching(val,element);
            if(!isValid){
                return false;
            }
        }
    }

    return stack.isEmpty();
};

const isOpening = (bracket) => {
    return bracket === '{' ||
           bracket === '(' ||
           bracket === '[';
};

const isClosing = (bracket) => {
    return bracket === '}' ||
           bracket === ')' ||
           bracket === ']';
}
const isMatching = (bracket1,bracket2) => {
    if(bracket1 === '{' &&  bracket2 === '}'){
        return true;
    }
    if(bracket1 === '(' &&  bracket2 === ')'){
        return true;
    }
    if(bracket1 === '[' &&  bracket2 === ']'){
        return true;
    }
    return false;
}

console.log(isExpressionBalanced('[()]{}{[()()]()}'));