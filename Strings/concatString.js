/**
 * Given an Array A consisting of N Strings, calculate the length of the longest string S such that :
-> S is a concatenation of some of the Strings from A.
-> every letter in S is different.

Example -
A = ["co","dil","ity"] , function should return 5, resulting string S could be codil , dilco, coity,ityco
A = ["abc","kkk","def","csv"] , returns 6 , resulting Strings S could be abcdef , defabc, defcsv , csvdef
A = ["abc","ade","akl"] , return 0 , impossible to concatenate as letters wont be unique.

N is [1..8] 
A consists of lowercase English letters ;
sum of length of strings in A does not exceed 100.
 */

 /**
  * Algorithm : Naive    O(N2)
       for i = 0 to N              O(N)
          for j = 1 to N           O(N)
             concat A[i] and A[j]  O(l1 + l2)
             check if all characters are unique   O(l1 + l2)
             if unique add to array R, else ignore
        if R i empty , return 0
        for i=0 to R.length
            check the maximum length
        return maximum length
  */