function quickSort(array) {
    const length = array.length;
    doQuickSort(array, 0, length - 1);
}

function doQuickSort(array, low, high) {
    if(low < high){
        const pivot = getPivot(array,low,high);
        doQuickSort(array,low,pivot);
        doQuickSort(array,pivot+1,high);
    }
}

function getPivot(array,low,high){
    // find pivot position such that all elements before are < pivot and all elements after are > pivot
    let i = low, j = high,pivot = low;
    while (i < j) {
        while (array[i] < array[pivot]) {
            i++;
        }
        while (array[j] > array[pivot]) {
            j--;
        }
        if(i < j){
            // swap i and j
            swap(array,i,j);
        }
    }
    // swap j and pivot
    swap(array,low,j);
    return pivot;
}

function swap(array,i,j){
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

const array = [4,8,1,3,6,2,7];
quickSort(array);
console.log(array)