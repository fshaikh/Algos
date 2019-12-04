/**
 * Suppose you have a random list of people standing in a queue. Each person is described by a pair of integers (h, k), where h is the height of the person and k is the number of people in front of this person who have a height greater than or equal to h. Write an algorithm to reconstruct the queue.

Note:
The number of people is less than 1,100.

 
Example

Input:
[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]

Output:
[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
/** */
var reconstructQueue = function(people) {
    const queue = [];
    for(let i=0;i<people.length;i++){
        queue[i] = -1;
    }
    people.sort( (o1,o2) => o1[0]==o2[0] ? o1[1]-o2[1] : o2[0]-o1[0]);
    console.log(people);
    
    
    for(let i=0;i<people.length;i++){
        const peopleCount = people[i][1];
        // find this guys place in the queue
        const isSlotAvailable = queue[peopleCount] === -1 ? true : false;
        if(!isSlotAvailable){
            // if slot is not available, put in the next available slot
            const nextAvailableSlot = getNextAvailableSlot(peopleCount,queue,false);
            queue[nextAvailableSlot] = people[i];
        }else{
            // check values before the available index
            if(canPutInAvailableSlot(people[i],queue)){
                 queue[peopleCount] = people[i];
            }else{
                const nextAvailableSlot = getNextAvailableSlot(peopleCount,queue,true);
                queue[nextAvailableSlot] = people[i];
            }
        }
        
    }
    return queue;
};

function getNextAvailableSlot(index,queue,startAhead){
    const start = startAhead ? index+1: index;
    for(let i=start;i<queue.length;i++){
        if(queue[i] === -1){
            return i;
        }
    }
    return -1;
}

function canPutInAvailableSlot(peoplePair,queue){
    let count = 0,emptyCount = 0;
    for(let i=peoplePair[1]-1; i>=0;i--){
        if(queue[i] === -1){
            emptyCount++;
            continue;
        }
        if(queue[i][0] >= peoplePair[0]){
            count++;
        }
    }
    if(emptyCount === 0){
        return count < peoplePair[1] ? false: true;
    }
    if(emptyCount === peoplePair[1]){
        return true;
    }
    return count < peoplePair[1] ? false: true;
}

console.log(reconstructQueue([[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]))

// https://evelynn.gitbooks.io/google-interview/queue-reconstruction-by-height.html