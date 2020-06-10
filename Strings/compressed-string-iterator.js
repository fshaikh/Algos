/**
Design and implement a data structure for a compressed string iterator.
It should support the following operations: next and hasNext.

The given compressed string will be in the form of each letter followed by a positive integer
representing the number of this letter existing in the original uncompressed string.

next() - if the original string still has uncompressed characters, return the next letter; Otherwise return a white space.
hasNext() - Judge whether there is any letter needs to be uncompressed.

Note:
Please remember to RESET your class variables declared in StringIterator, as static/class variables are persisted across multiple test cases. Please see here for more details.

Example:

StringIterator iterator = new StringIterator("L1e2t1C1o1d1e1");

iterator.next(); // return 'L'
iterator.next(); // return 'e'
iterator.next(); // return 'e'
iterator.next(); // return 't'
iterator.next(); // return 'C'
iterator.next(); // return 'o'
iterator.next(); // return 'd'
iterator.hasNext(); // return true
iterator.next(); // return 'e'
iterator.hasNext(); // return false
iterator.next(); // return ' '

Source: https://leetcode.com/problems/design-compressed-string-iterator/
 */

 /**
 * @param {string} compressedString
 */
var StringIterator = function(compressedString) {
    this.string = compressedString;
    this.index = 0;
    this.map = new Map();
};

/**
 * @return {character}
 */
StringIterator.prototype.next = function() {
    if(this.isCompleted()){
        return ' ';
    }
    
    let temp = this.index+1, count = 0,value = this.string[this.index];
    const key = `${this.index}:${value}`;
    if(!this.map.has(key)){
            while(temp < this.string.length && isDigit(this.string[temp])){
                count = count*10 + (+this.string[temp]);
                temp++;
        }
    }else{
        while(temp < this.string.length && isDigit(this.string[temp])){
                temp++;
        }
        count = this.map.get(key);
    }
    count--;
    if(count === -1){
        this.index = temp;
        this.map.delete(key);
        return '';
    }
    if(count === 0){
        this.index = temp;
        this.map.delete(key);
    }else{
        this.map.set(`${this.index}:${value}`,count);
    }
    return value;
    
    function isDigit(val){
        return val >= '0' && val <= '9';
    }
        
};

StringIterator.prototype.hasNext = function() {
    return !this.isCompleted();
};


StringIterator.prototype.isCompleted = function() {
    return this.index > this.string.length - 1;
};

/** 
 * Your StringIterator object will be instantiated and called as such:
 * var obj = new StringIterator(compressedString)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */