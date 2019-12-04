const getAllSubArrays = function(array){
    const subArrays = [];
    let maxProduct = Number.NEGATIVE_INFINITY;
    for(let i=0;i<array.length;i++){
        let temp = [array[i]];
        subArrays.push(temp);
        maxProduct = Math.max(array[i],maxProduct);
        for(let j=i+1;j<array.length;j++){
            temp = [...temp,array[j]];
            const product = temp.reduce((product,value)=>product*value,1);  
            maxProduct = Math.max(maxProduct,product);
            subArrays.push(temp);
        }
    }
    return maxProduct;
};

console.log(getAllSubArrays([1,2,3,4,-5,6]));
