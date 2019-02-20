/**
 * Given a string, find the minimum number of characters to be inserted to convert it to palindrome.
For Example:
ab: Number of insertions required is 1. bab or aba
aa: Number of insertions required is 0. aa
abcd: Number of insertions required is 3. dcbabcd
 */

 const formPalindrome = (str) => {
     if(isPalindrome(str)){
         return 0;
     }
     let i=0,
         j = str.length -1,
         minCount = 0,
         newString = '',
         tempArray = [];

     while(j > 0){
         if(newString !==  '' && isPalindrome(newString)){
             break;
         }
        if(str[i] === str[j]){
            j--;
            i++;
        }
            tempArray.push(str[j]);
            newString = tempArray.join('') + str;
            
            minCount++;
            // if(i > j){
            //     minCount++;
            //     continue;
            // }
            j--;
            //i++;
        
     }
     return minCount;
 };

 const isPalindrome = (str) => {
     let i = 0
         j = str.length - 1;
     while(i<j){
         if(str[i] !== str[j]){
             return false;
         }
         i++;
         j--;
     }
     return true;
 }

 console.log(formPalindrome('abcda'));