

/*
Evaluates the prefix expression and calculates the result for the given
variable values.

@param {String} expression - the prefix expression to evaluate.
@param {Object} variables - all the variables in the expression are the keys of
    this object and their corresponding values are the values the variable
    should take
@returns {Number|null} the numerical result of the expression evaluated with the
    given variable values. If the expression is invalid, it will return `null`.
*/
function result_expression(expression, variables) {
    if (expression == null) {
        return null;
    }

    // declare a stack to hold the operands and intermediate results
    const prefixStack = new Stack();
    let  isValidExpression = true;
    // Split the expression by whitespace
    const expressionParts = expression.split(' ');
    const length = expressionParts.length;
    let index = length - 1;

    while (index >= 0) {
        const expressionParam = expressionParts[index];
        if(expressionParam == ''){
            index--;
            continue;
        }
        // if expression is operand, push to stack
        if (isOperand(expressionParam)) {
            prefixStack.push(+expressionParam);
            index--;
            continue;
        }
        // if expression is operator, pop last 2 values from stack
        if (isOperator(expressionParam)) {
            const value1 = prefixStack.pop();
            const value2 = prefixStack.pop();
            if(value1 == null || value2 == null){
                isValidExpression = false;
                break;
            }
            prefixStack.push(getSubExpressionValue(value1,value2,expressionParam));
            index--
            continue;
        }
        // if expression is variable, read the value from object and push to stack
        const variableValue = variables[expressionParam];
        if(variableValue == null){
            isValidExpression = false;
            break;
        }
        prefixStack.push(+variableValue);
        index--;
    }

    return getPrefixExpressionValue(prefixStack,isValidExpression);


}

const operators = ['-', '+', '*', '/'];
/**
 * Supports 4 operators : +, -, *, and /
 * @param {*} value 
 */
const isOperator = (value) => {
    return operators.includes(value);
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

const getSubExpressionValue = (value1, value2, operator) => {
    let result;
    switch (operator) {
        case '+':
            result = value1 + value2;
            break;
        case '-':
            result = value1 - value2;
            break;
        case '*':
            result = value1 * value2;
            break;
        case '/':
            // / denotes integer division. / 7 2 evaluates to 3 and not 3.5
            result = Math.floor(value1 / value2);
            break;
    }
    return result;
}

const getPrefixExpressionValue= (prefixStack,isValidExpression) =>{
    // // if prefixStack is empty or has more than one value
    if(!isValidExpression ||
        prefixStack.Length !== 1){
        return null;
    }
    
    return prefixStack.pop();
}


console.log(result_expression('* 2 x + y', {"x":1,"y":3}))
