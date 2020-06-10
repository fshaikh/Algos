/**
 * @param {string} s
 * @return {number}
 */

const Stack = require("./Stack").Stack;
// 2+3-8*8/2

// 8*3+8/2-3*10/5*3
var calculate = function (s) {
  const operatorStack = new Stack(),
    operandStack = new Stack(),
    operatorCountMap = new Map();
  while (true) {
    calculateOperatorCount(s, operatorCountMap);
    for (let i = 0; i < s.length; ) {
      let value = s[i];
      if (value === " ") {
        i++;
        continue;
      } else if (isOperator(value)) {
        operatorStack.push(value);
        i++;
      } else {
        // get the numeric value till either end of string or  ' ' or operator
        let index = i + 1;
        while (index < s.length) {
          const v = s[index];
          if (isOperator(v) || v === " ") {
            break;
          }
          value += v;
          index++;
        }
        i = index;
        const operator = operatorStack.peek();
        const numericValue = +value;
        if (operator == null) {
          operandStack.push(numericValue);
        } else {
          // check if the expression can be evaluated now based on precedence
          if (operator === "/") {
            const result = Math.floor(+operandStack.pop() / numericValue);
            operandStack.push(result);
            operatorStack.pop();
            decrementOperatorCount(operatorCountMap, operator);
          } else if (operator === "*") {
            // check if * can be evaluated
            if (getOperatorCount("/", operatorCountMap) === 0) {
              const result = +operandStack.pop() * numericValue;
              operandStack.push(result);
              operatorStack.pop();
              decrementOperatorCount(operatorCountMap, operator);
            } else {
              operandStack.push(numericValue);
            }
          } else if (operator === "+") {
            // check if * can be evaluated
            if (
              getOperatorCount("/", operatorCountMap) === 0 &&
              getOperatorCount("*", operatorCountMap) === 0
            ) {
              const result = +operandStack.pop() + numericValue;
              operandStack.push(result);
              operatorStack.pop();
              decrementOperatorCount(operatorCountMap, operator);
            } else {
              operandStack.push(numericValue);
            }
          } else {
            if (
              getOperatorCount("/", operatorCountMap) === 0 &&
              getOperatorCount("*", operatorCountMap) === 0 &&
              getOperatorCount("+", operatorCountMap) === 0
            ) {
              const result = +operandStack.pop() - numericValue;
              operandStack.push(result);
              operatorStack.pop();
              decrementOperatorCount(operatorCountMap, operator);
            } else {
              operandStack.push(numericValue);
            }
          }
        }
      }
    }

    // if stack is not empty, construct a new expression and continue
    if (operatorStack.isEmpty()) {
      return operandStack.pop();
    }

    s = "";
    while (!operandStack.isEmpty()) {
      const op = operatorStack.pop();
      s = (op === -1 ? "" : op) + operandStack.pop() + s;
    }
  }
  // while s is not empty
  //    calculate count of /,*,+,-
  //    evaluate expression
  //    if stack is not empty, construct s
  //    if stack is empty, break
};

function isOperator(value) {
  if (value === "/" || value === "*" || value === "+" || value === "-") {
    return true;
  }
  return false;
}

function calculateOperatorCount(s, operatorCountMap) {
  operatorCountMap.clear();
  for (let i = 0; i < s.length; i++) {
    const value = s[i];
    if (isOperator(value)) {
      let count = operatorCountMap.get(value) || 0;
      operatorCountMap.set(value, count + 1);
    }
  }
}

function getOperatorCount(operator, operatorCountMap) {
  return operatorCountMap.get(operator) || 0;
}

function decrementOperatorCount(operatorCountMap, operator) {
  let count = operatorCountMap.get(operator) || 0;
  if (count > 0) {
    operatorCountMap.set(operator, count - 1);
  }
}

var calculate2 = function (s) {
  s = s.trim();
  let stack = [],
    num = 0,
    sign = "+";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") continue;
    if (!isNaN(s[i])) {
      num = num * 10 + +s[i];
    }
    if (isNaN(s[i]) || i === s.length - 1) {
      switch (sign) {
        case "+":
          stack.push(num);
          break;
        case "-":
          stack.push(-num);
          break;
        case "*":
          stack.push(stack.pop() * num);
          break;
        case "/":
          stack.push(parseInt(stack.pop() / num, 10));
          break;
      }
      sign = s[i];
      num = 0;
    }
  }
  return stack.reduce((a, b) => a + b);
};
const calculateNeat = function (s) {
    const operandStack = [];
    let number = 0,operator = '+';
    for(let i=0;i<s.length;i++){
        const value = s[i];
        if(value === ' '){
            continue;
        }
        else if(isOperator(value) || i === s.length - 1){
          switch(operator){
              case '*':
                  operandStack.push(operandStack.pop() * number);
                  break;
              case '/':
                  operandStack.push(Math.floor(operandStack.pop() / number));
                  break;
              case '+':
                  operandStack.push(number);
                  break;
              case '-':
                  operandStack.push(-1*number);
                  break;
          }
          number = 0;
          operator = value;
        }else{
          number = number*10 + (+value);
        }
  
      }
    return operandStack.reduce((result,value) => result + value)
  };
  // When an operator is encuntered and it is * or /, evaluate , else push to stack
// console.log(calculate2("2+3-8*8/2"));

const precedence = {
    '-': 0,
    '+': 0,
    '*' : 1,
    '/': 1
}
var calculateUsingSY = function(s) {
    // apply shunting yard algorithm to convert s to RPN
    // evaluate RPN
    return evaluateRPN(applyShuntingYard(s));
};


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

//
console.log(evaluateRPN("1-43*3/3/+"));
