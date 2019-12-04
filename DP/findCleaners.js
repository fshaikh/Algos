const findCleaners = function(rooms,capacity){
    // take a room and divide by senior capacity.
    // If remainder is 0, take it
    // If remainder is not 0, 
    //    take minimum of difference of remainder and senior or junior capacity
    //    and add

    // add senior and junior capacity
    // deivide by rooms
    // If remainder is 0, take it
    // else, take minimum of senior or junior capacity and add

    // take minimum of above two
    const optimizedResults = [];
    for (let index = 0; index < rooms.length; index++) { 
        const count = rooms[index];
        const remainder = count % capacity[0];
        const value = Math.floor(count/capacity[0]);
        const results1 = [],results2 = [];;
        if(remainder === 0){
            return [value];  // 1
        }
        // if any senior is above the current rooms, take it
        // let multiple = 1,index = 1;
        // while(multiple < count){
        //     multiple = capacity[0]*index;
        //     index++;
        // }
        if(remainder > capacity[0]){
            results1.push(0,value+1)
        }else{
            results1.push(value+1,0);
        }
        if(Math.abs(remainder - capacity[0]) < Math.abs(remainder - capacity[1])){
            results1.push(value);
            results1.push(0)
        }else{
            results1.push(value);
            results1.push(1);
        }
        const sum = capacity[0] + capacity[1];
        const remainder2 = Math.floor(count/sum);
        if(count%sum === 0){
            return [remainder2,remainder2];
        }
        if(Math.abs(remainder2 - capacity[0]) < Math.abs(remainder2 - capacity[1])){
            results2.push(remainder2 + 1);
            results2.push(remainder2);
        }else{
            results2.push(remainder2);
            results2.push(remainder2 + 1);
        }
        // find the optimized from the possible 
        console.log(results1,results2);
    }
    return optimizedResults;
}

console.log(findCleaners([28], [10,6])) // []