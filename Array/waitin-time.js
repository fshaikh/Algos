export function waitingTime(tickets, p) {
    // [1,3,2,5]
    var personsBefore = tickets.slice(0,p);
    var personsAfter = tickets.slice(p+1,tickets.length);
    var countofSteps = 0;
    const referenceCount = tickets[p];
    personsBefore.forEach((item)=>{
        if(item < referenceCount){
            countofSteps += item;
        } else{
            countofSteps += referenceCount;
        }
    });
    personsAfter.forEach((item)=>{
        if(item < referenceCount){
            countofSteps += item;
        } else{
            countofSteps += referenceCount - 1;
        }
    });
    return countofSteps;
}