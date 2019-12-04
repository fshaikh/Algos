const getLongestIncreasingSubsequence = (array) => {
    const length =array.length;
    let output = [],
        innerCountArray = [],
        max = 0,
        longestIncreasingSubsequence = [];
    
    for (let index = 0; index < length; index++) {
        innerCountArray = [];
        innerCountArray.push(array[index]);
        let tempMax = array[index];
        for(let j=index+1;j<length;j++){
            if(array[j] > tempMax){
                tempMax = array[j]
                innerCountArray.push(array[j]);
            }
        }
        output.push(innerCountArray);
    }
    output.forEach((item)=>{
        if(item.length > max){
            max = item.length;
            longestIncreasingSubsequence = [...item];
        }
    });
    return longestIncreasingSubsequence;
}

const getLIS = (array) => {
    // Create a temp array of the same length as the input array
    // Fill the array with 1 since the longest subsequence for every element is of length 1
    let tempArray = Array(array.length).fill(1);

    let i = 1, j =0;
}

// Call
console.log(getLongestIncreasingSubsequence([3,4,-1,5,8,2,3,12,7,9,10 ]));
