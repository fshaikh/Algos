/**
 * Count the unique elements in an Sorted Array
   e.g. [1 1 1 1 2 2 2 2 5 5 5 6 6 7 7 10] --> output = 6
 */
function getUniqueElementsCount(array){
    if(array == null || array.count === 0){
      return 0;
    }
    let count = 1;
    for(let i=0;i<array.length-1;i++){
        if(array[i] !== array[i+1]){
            count++;
        }
    }
    return count;
  }
  console.log(getUniqueElementsCount([1,2,3,4,5,5,6,6,7]))

const s = [1,2,3];
s.splice(2,1);
console.log(s)