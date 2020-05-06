function binarySearch(array, target){
    let low = 0,high = array.length - 1,mid;
    while(low <= high){
        mid = Math.floor((high + low) / 2);
        if(array[mid] === target){
            return true;
        }
        if(array[mid] < target){
            low = mid + 1;
            
        }else{
            high = mid-1;
        }
    }
    return false;
}

console.log(binarySearch([1,2,3,4,5],100));