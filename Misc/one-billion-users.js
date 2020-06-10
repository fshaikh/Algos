/**
 We have N different apps with different user growth rates. At a given time t, measured in days, the number of users
 using an app is g^t (for simplicity we'll allow fractional users), where g is the growth rate for that app.
 These apps will all be launched at the same time and no user ever uses more than one of the apps.
After how many full days will we have 1 billion total users across the N apps?

Input
1.0 < growthRate < 2.0 for all growth rates
1 <= N <= 1,000

Output
Return the number of full days it will take before we have a total of 1 billion users across all N apps.

Example 1
growthRates = [1.5]
output = 52

Example 2
growthRates = [1.1, 1.2, 1.3]
output = 79
Example 3

growthRates = [1.01, 1.02]
output = 1047
 */

 // Cannot do this in JS as it doesn not have a function which takes arbitrary value as a base for a log operation

 // Algo:
 // 1. Find the max value from the array  O(N)
 // 2. Return log        1000,000,000
 //              max-g

 function getBillionUsersDay(growthRates) {
    // Write your code here
    
  }