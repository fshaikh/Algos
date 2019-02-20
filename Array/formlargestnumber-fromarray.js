/**
 * Given a list of non negative integers, arrange them in such a manner that they
 * form the largest number possible.
 * Input:

2
5
3 30 34 5 9
4
54 546 548 60

Output:

9534330
6054854654
https://www.geeksforgeeks.org/given-an-array-of-numbers-arrange-the-numbers-to-form-the-biggest-number/
 * @param {*} array 
 */
const getLargestNumber = (array) => {
    array.sort((a,b)=>{
        const num1 = +(a.toString() + b.toString());
        const num2 = +(b.toString() + a.toString());
        return num1 > num2 ? -1 : 1;
    });
    return +(array.reduce((val,item)=>{
        return val+= item;
    },''));
};

console.log(getLargestNumber([1, 34, 3, 98, 9, 76, 45, 4]))