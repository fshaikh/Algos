/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
    if(!logs || logs.length === 0 || logs.length === 1){
        return [];
    }
    
    const letterLogs = [];
    digitLogs = [], result = [];
    
    logs.forEach(log => {
        const split = log.split(' ');
        if(isDigit(split[1])){
            digitLogs.push(split);
        }else{
            letterLogs.push(split);
        }
    });
    
    // sort letter-logs
    // "g1 act car","ab1 off key dog","a8 act zoo"
    letterLogs.sort((a,b) => {
       let index1 = 1,index2 = 1;
        // sort by letters. Need to consider each letter not just first
       while(index1 < a.length || index2 < b.length) {
            if(a[index1] === b[index2]){
                index1++;
                index2++;
                continue;
            }
            if(a[index1] < b[index2]){
                return -1;
            } 
            return 1;
       }
           // sort by identifier
           return getIdentifierOrder(a[0],b[0]);       
    });

    // merge
    const letterLogsNormalized = letterLogs.reduce((letters,value)=>{
        const joined = value.join(' ');
        letters.push(joined);
        return letters;
    },[]);
    const digitLogsNormalized = digitLogs.reduce((digits,value)=>{
        const joined = value.join(' ');
        digits.push(joined);
        return digits;
    },[]);
    
    result = [...letterLogsNormalized, ...digitLogsNormalized];
    return result;
};

function isDigit(value){
    const intValue = +value;
    return Number.isNaN(intValue) ? false: true;
}

function getIdentifierOrder(id1,id2){
    if(id1 < id2){
        return -1;
    }
    if(id1 > id2){
        return 1;
    }
    return 0;
}

const logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"];
console.log(reorderLogFiles(logs));