var numDecodings = function(s) {
    const n = +s;
    let dividend = n, remainder = 0;
    const set = new Set();
    while(dividend !== 0){
        remainder = dividend%10;
        dividend = Math.floor(dividend/10);
        checkAndAdd(set,remainder);
        checkAndAdd(set,dividend);
    }
    
    return set.length;
};

function checkAndAdd(set, value){
    if(value >= 1 && value <= 26){
            set.add(value);
        }
}

numDecodings('226')