const Stack = require('./Stack').Stack;
function calculate (expression) {
    if(expression == null || expression == ""){
      return 0;
    }
    const stack = new Stack();
    const expressionParts = expression.split(' ');
    let index = 0,
        isValidExpression = true;
    while(index < expressionParts.length){
      const expressionValue = expressionParts[index];
      if (isOperand(expressionValue)) {
        stack.push(+expressionValue);
        index++;
        continue;
    }
      if(isOperator(expressionValue)){
        // get the last two from the stack
        const value1 = stack.pop();
        const value2 = stack.pop();
        if(value1 == null || value2 == null){
          isValidExpression = false;
          break;
        }
        stack.push(getExpressionValue(value1,value2,expressionValue));
        index++;
        continue;
      }
      isValidExpression = false;
      break;
    }
    if(!isValidExpression){
      return null;
    }
    return stack.pop();
  }
  
  function isOperator(value){
    return  ['+', '-','*', '/'].includes(value);
  }
    
  /**
 * Positive integers in base 10
 */
const isOperand = (value) => {
    if (value < 0) {
        return false;
    }
    const operand = parseInt(value, 10);
    return isNaN(operand) ? false: true;
}
  
  function getExpressionValue(value1,value2,expressionValue){
    let result = 0;
    switch(expressionValue){
      case '+':
        result = value1 + value2;
        break;
      case '-':
        result = value2 - value1;
        break;
      case '*':
        result = value2 * value1;
        break;
      case '/':
        result = Math.floor(value2/ value1);
        break;
    }
    return result;
  }

  //console.log(calculate('1 2 3.5'));
  console.log(113%100);