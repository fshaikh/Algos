/**
 * Suppose there is a circle. There are N petrol pumps on that circle.
 *  You will be given two sets of data.
1. The amount of petrol that every petrol pump has.
2. Distance from that petrol pump to the next petrol pump.

Your task is to complete the function tour() which returns an integer denoting
 the first point from where a truck will be able to complete the circle 
 (The truck will stop at each petrol pump and it has infinite capacity).

Note :  Assume for 1 litre petrol, the truck can go 1 unit of distance.

 * https://roy3221.gitbooks.io/algorithms/content/ch8_greedy/leetcode_134_gas_station.html
 * @param {*} gasArray 
 * @param {*} distanceArray 
 */
const getStartGasStation = (gasArray, distanceArray) => {
    // first determine if we have enough gas to cover the entire distance
    // if not, we return -1
    let totalGas = 0;
    for (let i = 0; i < gasArray.length; i++) {
        totalGas += gasArray[i] - distanceArray[i];
    }
    if (totalGas < 0) {
        return -1;
    }

    // iterate the gas array and whenever we find the gas not enough at that point
    // move to the next station
    let net = 0,
        startStation = 0;
    for (let i = 0; i < gasArray.length; i++) {
        if ((net + gasArray[i]) - distanceArray[i] < 0) {
            net = 0;
            startStation = i + 1;
        } else {
            net += gasArray[i] - distanceArray[i];
        }
    }

    return startStation;
};

console.log(getStartGasStation([4,6,7,4],[6,5,3,5]))




