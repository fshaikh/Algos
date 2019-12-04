/**
 * Utility functions related to common geo operations
 */

 /**
  * Calculates slope of a line. Returns -Infinity/Infinity when divions by zero
  * Formula:  y2 - y1 / x2 - x1
  * @param {*} line - Array of points. [[x1,y1], [x2,y2]]
  * @returns - number representing slope of the line
  */
 function calculateSlope(line){
    const denominator = line[1][0] - line[0][0];
    if(denominator === 0){
        return Number.POSITIVE_INFINITY;
    }
    const numerator = line[1][1] - line[0][1];
    return Math.floor(numerator / denominator);
 }

 /**
  * Determines whether a query point is above a given line
  * @param {*} point - Query Point as [x,y]
  * @param {*} line - Array of points. [[x1,y1], [x2,y2]]
  * @returns - true if point is above a line else false
  */
 function isPointAboveLine(point,line){
    const higherPoint = line[0][1] > line[1][1] ? line[0] : line[1];
    return point[1] > higherPoint[1];
 }

 /**
  * Determines whether a query point is below a given line
  * @param {*} point - Query Point as [x,y]
  * @param {*} line - Array of points. [[x1,y1], [x2,y2]]
  * @returns - true if point is below a line else false
  */
 function isPointBelowLine(point,line){
    const lowerPoint = line[0][1] < line[1][1] ? line[0] : line[1];
    return point[1] < lowerPoint[1];
 }

 /**
  * Determines whether a query point is to the right of a given line
  * @param {*} point - Query Point as [x,y]
  * @param {*} line - Array of points. [[x1,y1], [x2,y2]]
  * @returns - true if point is to the right of a line else false
  */
 function isPointRightOfLine(point,line){
    const maxX  = Math.max(line[0][0],line[1][0])
    return point[0] > maxX;
 }

 /**
  * Determines whether a query point is to the left of a given line
  * @param {*} point - Query Point as [x,y]
  * @param {*} line - Array of points. [[x1,y1], [x2,y2]]
  * @returns - true if point is to the left of a line else false
  */
 function isPointLeftOfLine(point,line){
    const minX  = Math.min(line[0][0],line[1][0])
    return point[0] < minX;
 }
 module.exports = {
     calculateSlope,
     isPointAboveLine,
     isPointBelowLine,
     isPointRightOfLine,
     isPointLeftOfLine
 }