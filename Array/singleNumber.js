/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    if(nums.length === 1){
        return nums[0];
    }
    return nums.reduce((distinctElement,value)=>{
        distinctElement ^= value;
        return distinctElement;
    },0);
};

console.log(singleNumber([1]));
console.log(singleNumber([2,2,1]));
console.log(singleNumber([4,1,2,2,1]));