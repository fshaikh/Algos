/**
 * Shunting yard algorithm is used for parsing mathematical expressions specified in infix notation.
 * Input: Infix notation expression
 * Output: Reverse Polish Notation expression (RPN)
 * 
 * RPN expression is then evaluated to get the result of mathematical expression
 * 
 * This approach can be used to evaluate any mathemetical expression. It covers the following problems:
 * Basic Calculator - I, II, III
 * https://leetcode.com/problems/basic-calculator/
 * https://leetcode.com/problems/basic-calculator-ii
 */

 /**
  * Algorithm:  Evalaue a RPN expression
  * Iterate the expression
  * When value is a digit, push to stack
  * When value is operator, pop two items from stack. If there is only one item, initialize second to 0
  *    Evaluate the operator
  *    Push result to stack
  * Return top of the stack which is the result
  * @param {*} expression - Reverse Polish Notation
  */
function evaluateRPN(expression){
    const stack = new Stack();
    for(let i=0;i<expression.length;i++){
        const value = expression[i];
        if(isOperator(value)){
            // pop 2 items from stack and apply the operator.
            const operand1 = stack.pop();
            const operand2 = stack.pop() || 0;
            let result = 0;
            switch(value){
                case '+':
                    result = operand2 + operand1;
                    break;
                case '-':
                    result = operand2 - operand1;
                    break;
                case '*':
                    result = operand2 * operand1;
                    break;
                case '/':
                    result = Math.floor(operand2/operand1);
                    break;
            }
            stack.push(result);
        }else{
            stack.push(value);
        }
    }
    return stack.pop();
}

/**
 * Refer to wikipedia for an explaination of the algorithm: https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * Infix notation can contain: +,-,*,/,(,), non-negative numbers
 * @param {*} s 
 */
function applyShuntingYard(s){
    const queue = [];
    const operatorStack = new Stack();
    for(let i=0;i<s.length;){
        let value = s[i];
        if(value === ' '){
            i++;
            continue;
        }
        if(isOperator(value)){
            i++;
            if(value === '('){
                operatorStack.push(value);
                continue;
            }
            if(value === ')'){
                // pop from stack , add to queue
                // till '(' is found
                while(operatorStack.peek() !== '('){
                    queue.push(operatorStack.pop());
                }
                operatorStack.pop();
                continue;
            }
            // check the top of stack 
            let top = operatorStack.peek();
            if(top == null || precedence[value] > precedence[top]){
                operatorStack.push(value);
            }else{
                while(top!==null && precedence[value] <= precedence[top]){
                    queue.push(top);
                    operatorStack.pop();
                    top = operatorStack.peek();
                    
                }
                operatorStack.push(value) 
            }
        }else{
            // this is a number , we need to handle multi-digit number
            let index = i + 1;
            while (index < s.length) {
                const v = s[index];
                if (isOperator(v) || v === " ") {
                    break;
                 }
                value += v;
                index++;
            }
            queue.push(+value)
            i = index;
        }
    }
    
    // if operator stack is no empty, pop operators to queue
    while(!operatorStack.isEmpty()){
        queue.push(operatorStack.pop())
    }
    console.log(queue.join(''))
    return queue;
}

const precedence = {
    '-': 0,
    '+': 0,
    '*' : 1,
    '/': 1
}

function calculateUsingSY(s){
    return evaluateRPN(applyShuntingYard(s));
}
// console.log(calculateUsingSY("1*2-3/4+5*6-7*8+9/10"));

console.log("1234".substring(2,4));