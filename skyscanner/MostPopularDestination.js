const findMostPopularDestination = (destinations) => {
    if(destinations == null){
        return '';
    }

    const map = getDestinationMapCount(destinations);
    const destination = getDestinationWithMaxCount(map);

    return destination;
}

const getDestinationMapCount = (destinations) =>{
    let map = new Map();
    destinations.forEach((destination) => {
        if(!map.has(destination)){
            map.set(destination, 1);
        }else{
            const count = map.get(destination);
            map.set(destination,count + 1);
        }
    });
    return map;
};

const getDestinationWithMaxCount = (map) => {
    let destination = '';
    let maxCount = 0;
    for (var [key, value] of map) {
        if(value > maxCount){
            maxCount = value;
            destination = key;
        }
    }

    return destination;
};

console.log(findMostPopularDestination(['Singapore','Bangkok','Singapore','Bangkok','Singapore','Barcelona']))