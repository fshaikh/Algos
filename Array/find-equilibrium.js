/**
 * Equilibrium index of an array is an index such that the sum of elements at
 *  lower indexes is equal to the sum of elements at higher indexes.
Example :

Input : A[] = {-7, 1, 5, 2, -4, 3, 0}
Output : 3
3 is an equilibrium index, because:
A[0] + A[1] + A[2]  =  A[4] + A[5] + A[6]
Write a function int equilibrium(int[] arr, int n); that given a sequence arr[]
 of size n, returns an equilibrium index (if any) or -1 if no equilibrium indexes exist.
 */
const getEquilibriumIndex = (array) => {
    const length = array.length;
    let sum = array.reduce((s, value) => {
        return s + value;
    }, 0)
    let equilibriumIndex = -1;
    let leftSum = 0;
    for(let i=0;i<length;i++){
        sum = sum - array[i];
        
        if(sum === leftSum){
            console.log(sum, leftSum)
            equilibriumIndex = i;
            break;
        }
        leftSum += array[i];
        console.log(sum, leftSum)
    }
    return equilibriumIndex;
}

console.log(getEquilibriumIndex([-7, 1, 5, 2, -4, 3, 0]));