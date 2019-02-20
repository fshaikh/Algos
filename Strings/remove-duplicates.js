const removeDuplicates = (str) => {
    let indexArray = [];
    for (let i = 0; i < 255; i++) {
        indexArray[i] = 0;
    }

    for (let j = 0; j < str.length; j++) {
        const index = str.charCodeAt(j);
        indexArray[index] = indexArray[index] + 1;
    }

    let newString = '';
    for (let k = 0; k < str.length; k++) {
        const index = str.charCodeAt(k);
        const count = indexArray[index];
        if(count === 0){
            continue;
        }
        newString += str[k];
        indexArray[index] = 0;
    }
    return newString;
}
console.log(removeDuplicates('geeks for geeks'));