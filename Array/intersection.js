
/**
 Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Note:

Each element in the result must be unique.
The result can be in any order.
 */
/**

 * Time complexity: O(N)
 * Space Complexity: O(N)
 */
var intersection = function(nums1, nums2) {
    const set = new Set();
    const intersectionArray = [];
    nums1.forEach(num => set.add(num));
    nums2.forEach(num => {
        if(set.has(num)){
            intersectionArray.push(num);
            set.delete(num)
        } 
    });
    return intersectionArray;
};

/**
Constraint: TC => O(NLOGN), SC => O(1)
Assume arrays are sorted
 */
var intersection2 = function(nums1, nums2){
    const intersectionArray = [];
    let index1 = 0, index2 = 0;
    nums1.sort((a,b) => a - b);
    nums2.sort((a,b) => a - b);
    while(index1 < nums1.length && index2 < nums2.length){
        const nums1Value = nums1[index1], nums2Value = nums2[index2];
        if(nums1Value === nums2Value){
            intersectionArray.push(nums1Value);
            while(nums1[index1] === nums1Value) index1++;
            while(nums2[index2] === nums2Value) index2++;
        }
        else if(nums1Value < nums2Value){
            while(nums1[index1] === nums1Value) index1++;
        }else{
            while(nums2[index2] === nums2Value) index2++;
        }
        
    }
    return intersectionArray;
}

console.log(intersection2([1,2,2,1],
    [2,2]))