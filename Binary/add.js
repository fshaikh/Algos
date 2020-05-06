/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let index1 = a.length - 1, index2 = b.length -1, carry = 0;
    let sum = "";
    while(index1 >= 0 || index2  >= 0){
        const index1Value = index1 >=0 ? +a[index1] : 0;
        const index2Value = index2 >=0 ? +b[index2] : 0;
        const result = add(index1Value,index2Value,carry);
        carry = result.carry;
        sum = result.sum + sum ;
        index1--;
        index2--;
    }
    return carry === 0 ? sum : carry + sum;
};

function add(val1 = 0, val2 = 0, carry = 0){
    
   const sum = val1 + val2 + carry;
   switch(sum){
       case 0:
       case 1:
           return {sum, carry:0}
       case 2:
           return {sum:0, carry: 1}
       case 3:
           return {sum:1, carry: 1}
       default:
            throw new Error("invalid values")
   }
}
console.log(addBinary("1111","1"));