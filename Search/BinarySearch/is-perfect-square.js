/**
Given a positive integer num, write a function which returns True if num is a perfect square else False.

Follow up: Do not use any built-in library function such as sqrt.

 

Example 1:

Input: num = 16
Output: true
Example 2:

Input: num = 14
Output: false
 

Constraints:

1 <= num <= 2^31 - 1

ALGO: 
For num > 2 the square root a is always less than num/2 and greater than 1: 1 < x < \textrm{num} / 21<x<num/2.
 Since xx is an integer, the problem goes down to the search in the sorted set of integer numbers.
  Binary search is a standard way to proceed in such a situation.
 */

function isPerfectSquare(num) {
    if (num < 2) {
        return true
    }
    var low  = 0
    var high  = num / 2
    while( low <= high) {
        let mid = (high + low) / 2
        let square = mid * mid
        if (square === num) {
            return true
        }
        if (square > num) {
            high = mid - 1
        }
        if (square < num) {
            low = mid + 1
        }
    }
    return false
}
