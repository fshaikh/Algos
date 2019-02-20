/**
 * Given an array of positive integers. Your task is to find the leaders in the array.
Note: An element of array is leader if it is greater than or equal to all
 the elements to its right side. Also, the rightmost element is always a leader. 
 * @param {*} array 
 */

const findLeaderSubOptimal = (array) => {
    const length = array.length;
    let leaders = [],
        found = false;


    for(let i=0;i<length;i++){
        found = false;
        for(let j=i+1;j<length;j++){
            if(array[i] < array[j]){
                found = false;
                break;
            }
            found = true;
        }
        if(found){
            leaders.push(array[i]);
        }
    }
    leaders.push(array[length-1]);

    return leaders;
}

/**
 * Start from end of the array and compare with max value. Whenever array value is 
 * greater than the max value, array value is a leader
 * @param {*} array 
 * Complexity: O(N)
 */
const findLeader = (array) => {
    const length = array.length;
    let leaders = [],
        max = Number.MIN_SAFE_INTEGER;
    for(let i=length-1;i>=0;i--){
        if(array[i] > max){
            leaders.push(array[i]);
            max = array[i]
        }
    }

    return leaders;
}

console.log(findLeader([16,17,4,3,5,2]))