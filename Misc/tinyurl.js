/**
 * TinyURL is a URL shortening service where you enter a URL
 *  such as https://leetcode.com/problems/design-tinyurl 
 * and it returns a short URL such as http://tinyurl.com/4e9iAk.

Design the encode and decode methods for the TinyURL service.
There is no restriction on how your encode/decode algorithm should work.
You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL
can be decoded to the original URL.
 */

 /**
  * Encoding Algorithm
  * 
  * 1. We use base62 encoding (a-zA-Z0-9). Construct an base62 array containining 'a'-'z','A'-'Z',0-9
  * 2. We initialize a counter from 1.
  * 3. Convert the id to base 62 like how we convert decimal to base 2 (binary). Same algorithm.
  *    Instead of using 2 for modulo and dividend, use 62. Add remainder to an array
  * 4. Initialize a string variable which holds the encoded value
  * 5. Iterate the array. Each array value is an index into base62 array. Read the value at index
  *    Append to string variable
  * 6. Return string variable
  * 
  * For eg: 
  * id = 100,
  * produces [1,38]  (100/62 gives 1 as dividend and 38 as remainder. Add 38)
  *                   (1/62 gives 0 as dividend and 1 as remainder. Add 1)
  * iterate the above array
  * 1 index in the array gives 'b' as value
  * 38 index gives 'M' as value
  * So encoded value is : bM
  */

let id = 100;
const base62 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',0,1,2,3,4,5,6,7,8,9];
const forwardMap = new Map();
const reverseMap = new Map();
/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
const encode = function(longUrl) {
    if(reverseMap.has(longUrl)){
        return reverseMap.get(longUrl);
    }
    // take the id and convert to base 62 (this is similar to how we doe base 2 to convert decimal to binary)
    let base62Digits = [];
    let dividend = id , remainder = 0;
    while(dividend > 0){
        remainder = dividend%62
        dividend = Math.floor(dividend/62);
        base62Digits.unshift(remainder);
    }
    let encoded = '';
    base62Digits.forEach(digit => {
        encoded += base62[digit];
    });
    id++;
    forwardMap.set(encoded,longUrl);
    reverseMap.set(longUrl,encoded);
    return encoded;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function(shortUrl) {
    return forwardMap.get(shortUrl);
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */

 console.log(decode(encode('https://leetcode.com/problems/design-tinyurl')));