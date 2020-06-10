/**
 Given a list of n integers arr[0..(n-1)], determine the number of different pairs of elements within it which sum to k.
If an integer appears in the list multiple times, each copy is considered to be different; that is, two pairs are considered different if one pair includes at least one array index which the other doesn't, even if they include the same values.
Signature
int numberOfWays(int[] arr, int k)
Input
n is in the range [1, 100,000].
Each value arr[i] is in the range [1, 1,000,000,000].
k is in the range [1, 1,000,000,000].
Output
Return the number of different pairs of elements which sum to k.

Example 1
n = 5
k = 6
arr = [1, 2, 3, 4, 3]
output = 2
The valid pairs are 2+4 and 3+3.

Example 2
n = 5
k = 6
arr = [1, 5, 3, 3, 3]
output = 4
There's one valid pair 1+5, and three different valid pairs 3+3 (the 3rd and 4th elements, 3rd and 5th elements,
and 4th and 5th elements).

Example 3
n = 4
k = 2
arr = [1, 1, 1, 1]
output: 5

https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=840934449713537
 */

 // This ia a tricky problem and the algo is:
 // 1. Iterate the array and add count of each element to a map
 // 2. Iterate the array
 //      Do diff = sum - arr[i]
 //      If diff is present in map, add count to map value
 //      If diff is same as arr[i], decrement its value in map
 // 3. return count / 2
 function numberOfWays(arr, k) {
    // Write your code here
    const map = new Map();
    let count = 0;
    arr.forEach(value =>{
      if(!map.has(value)){
        map.set(value,0)
      }
        map.set(value, map.get(value) + 1)
     
    });
    
    arr.forEach(value => {
      const diff = k - value;
      if(map.has(diff)){
        count += map.get(diff);
      }
      if(diff === value){
        map.set(diff, map.get(diff) - 1)
      }
    });
   
    
    return Math.floor(count/2) ;
  }