function rearrangeWord(word) {
    word = Array.from(word);
    if (word == null || word.length < 1) {
        return "no answer";
    }
    const length = word.length;
    // start from the end and traverse backwards till we find a char lesser than this
    for (var index = length - 1; index > 0; index--) {
        if (word[index] > word[index-1]) {
            break;
        }
    }

    // no letter found which is lesser, so return
    if (index === 0) {
        return "no answer";
    }
    
    const ref = word[index-1];
    let nextMax = index;
    for(let j=index+1;j<length;j++){
        if(word[j] > ref && word[j] < word[nextMax]){
            nextMax = j;
        }
    }
    

    var temp = word[index - 1]; 
    word[index - 1] = word[nextMax]; 
    word[nextMax] = temp; 

    var sorted = word.slice(index).sort();
    var front = word.slice(0,index);
    var nextGreaterWord = [...front,...sorted].join('');
    
    return nextGreaterWord;

}

function rearrange(array) {
    let binary = [];
    array.forEach((item) => {
        binary.push(toBinary(item));
    });
    let obj = {};
    binary.forEach((item)=>{
        const onesCount = getOnesCount(item);
        if(!obj.hasOwnProperty(onesCount)){
            obj[onesCount] = [item];
        }else{
            obj[onesCount].push(item);
        }
    });
    let output = [];
    for(let i in obj){
        var value = obj[i];
        if(value.length === 1){
            output.push(toDecimal(value[0]));
        }else{
            let a1 = [];
            value.forEach((item) => {
                a1.push(toDecimal(item))
            });
            a1.sort();
            for(let k=0;k<a1.length;k++){
                output.push(a1[k]);
            }
        }
    }
    return output
}

function toBinary(number) 
    { 
        var binaryNum = [];
  
        while (number > 0)  
        { 
            binaryNum.push(number % 2); 
            number = Math.floor(number / 2); 
      } 
  
        binaryNum.reverse();
        return binaryNum;
    } 

    function toDecimal(value){
        let decimal = 0;
        const length = value.length;
        let index = 0;
        let power = length - 1;
        while(index < length){
            let place = value[index] * Math.pow(2,power);
            decimal += place;;
            power--
            index++;
        }
        return decimal;
    }

    function getOnesCount(array){
        let count = 0;
        return array.reduce((sum,item)=> {
            if(item === 1){
                sum = sum + 1;
            }
            return sum;
        },0);

    }

    
//console.log(toDecimal([1,0,0,0]));
console.log(rearrange([7,8,5,6]));