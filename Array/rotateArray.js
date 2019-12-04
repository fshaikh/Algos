/**
 * 
 */



// function rotateArray(array,direction,steps){
//     if(direction === 0){
//         rotateLeft(array,steps);
//     }else{
//         rotateRight(array,steps);
//     }
// }

// function rotateRight(array,steps){
//     for(let i=0;i<steps;i++){
//         rotateOneStepToRight(array);
//     }
// }
// function rotateOneStepToRight(nums){
//     const length = nums.length;
//     for(let i = length - 1;i> 0;i--){
//         let temp = nums[i];
//         nums[i] = nums[i-1];
//         nums[i-1] = temp;
//     }
// }

//#region Formula-based
var rotate = function(nums, k) {
    const length  = nums.length;
    const a = []
    for(let i=0;i<length;i++){
        const newIndex = getNewIndex(i,k,length);
        console.log(newIndex)
        a[newIndex] = nums[i];
    }
    for(let i=0;i<length;i++){
        nums[i] = a[i]
    }
};

function getNewIndex(index,k,length){
    const offset = index + k%length;
    return offset < length ? offset : offset - length; 
}
//#endregion Formula-based



const array = [-1,-100,3,99];
rotate(array,3);
console.log(array);
