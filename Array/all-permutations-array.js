function getAllPermutations(array){
    const permutations = [];
    function callback(permutation){
        permutations.push(permutation);
    }
    doPermutation([],array,callback);

    function doPermutation(prefix,suffix,callback){
        if(suffix.length === 0){
            callback(prefix);
            return;
        }
        for(let i=0;i<suffix.length;i++){
            prefix.push(suffix[i]);
            const newArray = suffix.filter((value,index) => i !== index);
            doPermutation([...prefix],newArray,callback);
            prefix.pop();
        }
    }
    return permutations;
}

console.log(getAllPermutations('abc'));