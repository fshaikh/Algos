var floodFill = function(image, sr, sc, newColor) {
    const visited = new Set(),rows = image.length,columns = image[0].length;
    const refColor = image[sr][sc];
    doFloodFill(sr,sc);
    return image;
    
    function doFloodFill(i,j){
        if(!isValidCell(i,j)){
            return;
        }
        markVisited(i,j);
        if(image[i][j] === refColor){
            image[i][j] = newColor;
        }
        
        doFloodFill(i-1,j);
        doFloodFill(i+1,j);
        doFloodFill(i,j-1);
        doFloodFill(i,j+1);
    }
    function getKey(i,j){
        return `${i}${j}`;
    }
    function isVisited(i,j){
        return visited.has(getKey(i,j));
    }
    
    function markVisited(i,j){
        visited.add(getKey(i,j));
    }
    
    function isValidCell(i,j){
        return !isVisited(i,j) &&
               i >=0 && i < rows &&
               j >=0 && j < columns &&
               image[i][j] === refColor;
            
    }   
};
console.log(floodFill([[2,3,4],[2,2,0],[3,0,1]],
    1,
    1,
    2));