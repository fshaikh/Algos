/**
 Write a function that takes an unsigned integer and return the number of '1' bits it has (also known as the Hamming weight).

 

Example 1:

Input: 00000000000000000000000000001011
Output: 3
Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.
Example 2:

Input: 00000000000000000000000010000000
Output: 1
Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.
Example 3:

Input: 11111111111111111111111111111101
Output: 31
Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.
 */

 // #region Approach 1 - Decimal to binary conversion
 // Convert given decimal to binary and count the number of times remainder is 1.
 // TC: O(N)

 /**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let remainder = 0,count = 0;
    while(n !== 0){
        remainder = Math.floor(n % 2)
        if(remainder === 1){
            count++;
        }
        n = Math.floor(n / 2);
    }
    return count;
  };
 //#endregion Approach 1 - Decimal to binary conversion

 //#region Approach 2 - Bit Manipulation using bit mask
 // This is clearly a bit manipulation problem , so must think in terms of bit operations
 // Given input is a 32-bit number. So it has 32-bits from 0 - 31.Each bit is either 0 or 1. We need to find the set bits
 // Basics:  & operator, left shift operator
 // To find, if each bit is 1 or 0, we can do :  bit & 1. If bit is 1, this will give result as 1
 // So we do an '&' operation on each bit 32-times. Every time we change the mask to be 1 at that bit position
 // for eg: 
 //  Iteration 1:
 //       number = 00000000000000000000000000001011  &
 //       mask   = 00000000000000000000000000000001

 // Iteration 2:
 //       number = 00000000000000000000000000001011  &
 //       mask   = 00000000000000000000000000000010

 // Iteration 3:
 //       number = 00000000000000000000000000001011  &
 //       mask   = 00000000000000000000000000000100
 // As seen above, in each iteration we shift the 1 bit of mask to left by one. This can be done by << operator

 // Since we do this 32-times, (size of integer is 32-bits)

 var hammingWeight2 = function(n) {
     let count = 0;
     let mask = 1;
     for(let i=0;i<32;i++){
         if((n & mask) !== 0){
             count++;
         }
         mask <<= 1;
     }
     return count;
 }
 //#endregion Approach 2 - Bit manipulation using bit mask

 console.log(hammingWeight2(11));