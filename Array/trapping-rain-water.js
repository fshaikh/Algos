/**
 Given n non-negative integers representing an elevation map where the width of each bar is 1, 
 compute how much water it is able to trap after raining.
Example:

Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

ALGO:
Need to compute water trapped at each building
Total water trapped = Sum(wtaer trapped at each building)

Now, how do we compute water trapped at each building?
If you visualize the input array, the key insight to gain is which buildings will have water trapped and which ones not?
So first draw the input array on a 2-D coordinate plane. X = 1 unit, Y = height
You will notice that water is trapped at buildings which have greater buildins to both its left and right

So now we iterate the input array. For each building find greatest building to its left and greatest to its right
Volume = min(left, right) - height

IF we do a naive way, this will be O(N2). To make it O(N), we can precompute for each building,
greatest element to its left and greatest element to its right

 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    // calculate volume of water trapped at each building
    //.  water will only be trapped in building which has buildings of greater 
    //.  height on either side of it.
    //   So for each building :
    //     find greatest element to its left
    //.    find greatest element to its right
    //.    water trapped = min(left,right) - height
    // add the total volume
    const left = [], right = [];
    let totalVolume = 0;
    populateGreaterElementsLeft();
    populateGreaterElementsRight();
    
    for(let i=0;i<height.length;i++){
        const volume = Math.min(left[i],right[i]) - height[i];
        totalVolume += (volume > 0 ? volume : 0);
    }
    return totalVolume;
    
    function populateGreaterElementsLeft(){
        left.push(height[0]);
        for(let i=1;i<height.length;i++){
            if(left[left.length - 1] > height[i]){
                left.push(left[left.length - 1])
            }else{
                left.push(height[i]);
            }
        }
    }
    
    function populateGreaterElementsRight(){
        const heightLength = height.length-1
        right.unshift(height[heightLength]);
        const rightLength = right.length-1;
        
        for(let i=heightLength-1;i>=0;i--){
            if(right[rightLength] > height[i]){
                right.unshift(right[rightLength])
            }else{
                right.unshift(height[i])
            }
        }
    }
    
};

