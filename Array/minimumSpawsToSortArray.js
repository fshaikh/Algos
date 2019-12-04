function minimumSwaps(array) {
    const map = new Map();
    const positions = new Map();
    let noOfSwaps = 0;

    // O(N)
    for (let index = 0; index < array.length; index++) {
        let value = array[index];
        const actualPosition = index;
        const expectedPosition = --value;
        map.set(array[index],`${actualPosition}:${expectedPosition}`);
        positions.set(actualPosition, array[index]);
    }

    // O(N)
    for(let i=1;i<array.length;i++){
        const [actualPosition,expectedPosition] = decodePosition(map.get(i));
        if(actualPosition === expectedPosition){
            continue;
        }
        const v = positions.get(expectedPosition);
        map.set(v,`${actualPosition}:${decodePosition(map.get(v))[1]}`);
        positions.set(actualPosition,v)
        noOfSwaps++;
    }
    return noOfSwaps;

}

function decodePosition(encodedPosition){
    const a = encodedPosition.split(':');
    return [+a[0],+a[1]];
}

console.log(minimumSwaps([1, 3, 5, 2, 4, 6, 7]));