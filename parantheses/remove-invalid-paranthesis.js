/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    // start from 0
    // If '(', add to stack and add its index to stack
    // If ')'
    //     If nothing on stack, implies this is a invalid closing bracket, so add its index to index stack
    // If something on stack, implies there is a corresponding opening, so remove from both stacks
    
    // If index stack is not empty, remove s values from the index
    
    const bracketStack = [], invalidIndexStack = [];
    for(let i=0;i<s.length;i++){
        if(s[i] === '('){
            bracketStack.push('(');
            invalidIndexStack.push(i);
        }else if(s[i] === ')' && bracketStack.length === 0){
            
            invalidIndexStack.push(i);
            
        }else if(s[i] === ')' && bracketStack.length !== 0){
            bracketStack.pop();
            invalidIndexStack.pop();
        }
    }

    if(invalidIndexStack.length === 0){
        return s;
    }
    const array = s.split('');
    
    for(let i=0;i < invalidIndexStack.length;i++){
        array.splice(invalidIndexStack[i],1)
    }
    return array.join('')
};

console.log(minRemoveToMakeValid("a)b(c)d"));