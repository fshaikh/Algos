/**
Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num,
 calculate the number of 1's in their binary representation and return them as an array.

Example 1:

Input: 2
Output: [0,1,1]
Example 2:

Input: 5
Output: [0,1,1,2,1,2]
Follow up:

It is very easy to come up with a solution with run time O(n*sizeof(integer)). 
But can you do it in linear time O(n) /possibly in a single pass?
Space complexity should be O(n).
Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.
 */
// var countBits = function (num) {
//   const results = [];
//   const cache = new Map();
//   let cacheHitCount = 0,
//     cacheMissCount = 0;
//   for (let i = 0; i <= num; i++) {
//     const setBitsCount = getSetBitsCount(i);
//     cache.set(i, setBitsCount);
//     results.push(setBitsCount);
//   }

//   function getSetBitsCount(num) {
//     let remainder = 0,
//       count = 0;
//     while (num !== 0) {
//       remainder = Math.floor(num % 2);
//       if (remainder === 1) {
//         count++;
//       }
//       num = Math.floor(num / 2);
//       if (cache.has(num)) {
//         cacheHitCount++;
//         return count + cache.get(num);
//       }
//       cacheMissCount++;
//     }
//     return count;
//   }
//   console.log('Cache Hit: ', cacheHitCount)
//   console.log('Cache Miss: ', cacheMissCount)
//   return results;
// };

var countBits = function (num) {
    const results = [];
    let mask = 1;
    for (let i = 0; i <= num; i++) {
      const setBitsCount = getSetBitsCount(i);
      results.push(setBitsCount);
      mask = 1;
    }
  
    function getSetBitsCount(num) {
      let count = 0
      for(let i=0;i<32;i++){
          if((num & mask) !== 0){
              console.log(count)
              count++;
          }
          mask <<= 1;
      }
      return count;
    }
    return results;
}

console.log(countBits(1001))

