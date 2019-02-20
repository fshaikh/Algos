/**
 * Algorithm to find sub array which adds upto a given sum
 * @param {*} array 
 * @param {*} sum 
 */
const getSubArrayWithGivenSum = (array, sum) => {
    const length = array.length;
    let running_sum = 0,
        indexArray = [],
        found = false;

    for (let i = 0; i < length; i++) {
        if(found){
            break;
        }
        running_sum = array[i];
        indexArray = [];
        for (let j = i + 1; j < length; j++) {
            running_sum += array[j];
            if (running_sum > sum) {
                running_sum = 0;
                indexArray = [];
            } else if (running_sum < sum) {
                indexArray.push(i + 1);
            } else {
                indexArray.push(j+1);
                found = true;
                break;
            }
        }
    }

    return indexArray.length > 0 ? [indexArray[0], indexArray[indexArray.length - 1]] : -1;

}
console.log(getSubArrayWithGivenSum([1, 2, 3, 7,5], 15));