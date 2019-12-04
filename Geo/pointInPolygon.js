/**
 * Point in polygon :
 * Given a point and a polygon (simple convex,simple concave), 
 * return true if point is inside the polygon, else return false
 * Edge Cases:
 *  - Point is on the boundary
 *  - Point is located such that the ray passes only through the vertex
 */

 /**
  * @tutorial
  * P - Point, Q - Polygon, R - ray starting at P and going right to infinity
  * Algorithm is a function of number of edges E of polygon Q. Time complexity : O(E)
  *     For each edge
  *         determine if ray intersects the edge
  *         if intersects, count++
  *     if count is odd, return true
  *     if count is even, return false
  * @param {*} point 
  * @param {*} polygon 
  */
function isPointInPolygon(point,polygon){
    
}