/**
 There is a brick wall in front of you. The wall is rectangular and has several rows of bricks.
 Bricks have the same height but different width. 
 You want to draw a vertical line from top to the bottom and cross the least bricks.

The brick wall is represented by a list of rows. Each row is a list of integers representing the 
width of each brick in this row from left to right.

If your line go through the edge of a brick, then the brick is not considered as crossed. 
You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.

You cannot draw a line just along one of the two vertical edges of the wall, in which case
 the line will obviously cross no bricks.

Example:

Input: [[1,2,2,1],
        [3,1,2],
        [1,3,2],
        [2,4],
        [3,1,2],
        [1,3,1,1]]

Output: 2

Explanation: 

Note:

The width sum of bricks in different rows are the same and won't exceed INT_MAX.
The number of bricks in each row is in range [1,10,000]. The height of wall is in range [1,10,000].
Total number of bricks of the wall won't exceed 20,000.



Algorithm:
At first glance, this seems like a difficult problem. Look at the diagram of the brick wall
The line needs to cross the maximum number of edges to minimize the bricks being crossed.  

FIND HOW MANY BRICKS END AT THE SAME EDGE. GET THIS FREQUENCY
Look at the first row:
[1,2,2,1] => 
- -- -- -
Each brick ends at an edge. For eg: brick 1 ends at edge 1, brick 2 ends at edge 3 ( 1+ 2), brick 3 ends at edge 5 (1 + 2+ 2).
We discard the last brick, since its mentioned in the problem statement that the last vertical line cannot be drawn as it will
not cross any brick
So what this means is that there is one brick which ends at edge 1, 1 brick which ends at edge 3 and 1 brick which ends at edge 5

Look at second row:
[3, 1, 2]
--- - --
Brick 1 ends at edge 3, Brick#2 ends at edge 4 (3 + 1)
So now we have 2 bricks which end at edge 3 (Brick#2 from row 1 and Brick#1 from row 2)

So we keep doing this for each row we can get the number of bricks which end at the same edge. We maintain this in a map

1 - 3 (no.of bricks which end at edge 1 is 3)
3 - 3 (no.of bricks which end at edge 3 is 3)
2 - 1 (no.of bricks which end at edge 2 is 1)
4 - 4 (no.of bricks which end at edge 4 is 4)
5 - 2 (no.of bricks which end at edge 5 is 2)
Now you go ahead and actually visualize this in a diagram. And you can see the vertical line which passes through 4 edges
So we know that 4 bricks end at the same edge (4). so if we can pass the vertical line via this edge, we can minimize the 
number of crossed bricks

Now we have maxCount = 4. So number of crossed bricks will be wall.length - maxCount

https://leetcode.com/problems/brick-wall/discuss/613228/Easy-c%2B%2B-implementation-using-map-with-explanation
 */

 /**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function(wall) {
    // line will not cross a brick if it passes the end edge of a brick
    // so if we find number of times for each brick edge
    
    const map = new Map();
    let maxCount = 0;
    for(let i=0;i<wall.length;i++){
        const row = wall[i];
        let brickWidthSum = 0;
        // need to ignore the last brick in each row
        for(let i=0;i<row.length - 1;i++){
            brickWidthSum += row[i];
            let currentCount = (map.get(brickWidthSum) || 0) + 1;
            // if current count is not 0,we found 2 bricks which end at the same edge
            map.set(brickWidthSum, currentCount);
            if(currentCount > maxCount){
                maxCount = currentCount
            }
        }
    }
    return wall.length - maxCount;
};
