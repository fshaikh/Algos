// https://www.youtube.com/watch?v=7h1s2SojIRw - Excellent explaination
// https://www.youtube.com/watch?v=-qOVVRIZzao - Complexity Analysis
const quickSort = (array) => {
    array.push(Number.MAX_SAFE_INTEGER);
    doSort(array, 0, array.length - 1);
    // remove the last element
    
};

const doSort = (array, low, high) => {
    if (low < high) {
        let j = partition(array, low, high);
        doSort(array, low, j);
        doSort(array, j+1, high);
    }
};

const partition = (array, low, high) => {
    let i = low,
        j = high,
        pivot = array[low];
    while (i < j) {
        do {
            i++;
        } while (array[i] <= pivot);

        do {
            j--;
        } while (array[j] > pivot);

        if (i < j) {
            swap(array, i, j);
        }
    }
    swap(array, low, j);
    return j;
}

const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

let array = [6,5,8,9,3,10,15,12,16];
quickSort(array);
console.log(array);