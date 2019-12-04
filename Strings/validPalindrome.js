var validPalindrome = function(s) {
    // Algo: 
    // first check if s is a plaindrome. If it is return true   O(N)
    // for each character                                       O(N)
    //    check if the remaining string is a palindrome. If it is, return true   O(N)
    // return false if not possible
    
    // TC: O(N) + O(N2)
    // SC: O(N-1)
    
    if(isPalindrome(s)){
        return true;
    }
    for(let i=0;i<s.length;i++){
        let newStr = s.substring(0,i) + s.substring(i+1,s.length);
        if(isPalindrome(newStr)){
            return true;
        }
    }
    return false;
};

const isPalindrome = function(s){
    let start = 0,end = s.length -1;
    while(start < end){
        if(s[start] !== s[end]){
            return false;
        }
        start++;
        end--;
    }
    return true;
}

console.log(validPalindrome('abca'));