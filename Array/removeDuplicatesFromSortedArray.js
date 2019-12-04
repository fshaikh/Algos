/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let count = 1;
    for(let i=0;i<nums.length;i++){
        let j = i;
        count = 1;
        while(nums[j] === nums[j+1]){
            j++;
            count++;
        }
        if(count >= 2){
            nums.splice(i+1,--count);
        }
    }
};
const nums = [1,1,1,1];
removeDuplicates(nums);
console.log(nums);