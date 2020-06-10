/**
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), 
find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Example 2:

Input: [[7,10],[2,4]]
Output: 1

ALGO:
This is a really tricky question. Logic is as below:
We sort by start times first. This is what we would in real world as well. We start the earliest meeting first
We put the first meeting in a room (rooms array)
Then we go through each meeting starting from 2nd one.
We check if there is any room which we can occupy. So we go through the rooms and check. We check by comparing 
new meeting start time and existing meeting end time. If st >= end, this means we can occupy this room ,else
we need to occupy a new room
 */
function getMinimumMeetingRooms(intervals){
    if(intervals == null || intervals.length === 0){
        return 0;
    }

    // This array holds all the meetings
    let rooms = [];
    // Sort by start time, since we want to start the earliest meeting first
    intervals.sort((a,b) => a[0] - b[0]);
    // Push the first meeting to the meeting room
    rooms.push(intervals[0]);
    // Iterate form 2nd onwards
    for(let i=1;i<intervals.length;i++){
        // Check each room
        for(let j=0;j<rooms.length;j++){
            // Can i occupy this room? If our start time >= this meeting's end time
            if(rooms[j][1] <= intervals[i][0]){
                // we can use this room
                // So we put ourself into the room which was occupied by previous meeting
                rooms[j] = intervals[i];
                break;
            }else{
                // We need a  new meeting room
                rooms.push(intervals[i]);
                break;
            }
        }
        // Keep the meeting with the earliest end time at the top
        rooms.sort((a,b) => a[1] - b[1])
    }
    console.log(rooms)
    return rooms.length;
}

console.log(getMinimumMeetingRooms([[0,30],[5,10],[15,20]]))