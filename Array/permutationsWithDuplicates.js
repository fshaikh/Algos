/**
 * Given a collection of numbers that might contain duplicates,
 *  return all possible unique permutations.

Example:

Input: [1,1,2]
Output:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
 */
var permuteUnique = function(nums) {
    const permutations = [];
    const callbackFn = function(array){
        permutations.push(array);
    }
    doPermuteCore([],nums,callbackFn,nums.length);
    return permutations;
};

function doPermuteCore(prefix,suffix,callback){
    if(suffix.length === 0){
        callback(prefix);
        return;
    }
    // iterate nums
    for (let index = 0; index < suffix.length; index++) {
            prefix.push(suffix[index]);
            const newArray = suffix.filter((value,i) => i !== index);
            doPermuteCore([...prefix],newArray,callback);
            prefix.pop();
    }
}
console.log(permuteUnique([1,1,2]));