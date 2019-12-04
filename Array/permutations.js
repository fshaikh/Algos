/**
 * Given a collection of distinct integers, return all possible permutations.

Example:
n = 3, P = 6
n = 4  4!
n = M p = M!
Input: [1,2,3,4,5]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
 */

var permute = function(nums) {
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

console.log(permute([1,2,3]));