/**
 * https://www.hackerrank.com/challenges/designer-pdf-viewer/problem
 * @param {*} h 
 * @param {*} word 
 */
function designerPdfViewer(h, word) {
    const width = word.length;
    // go through the word and find the letter with the maximum height. Max height is fetched from h
    let maxHeight = -1;
    for(let i=0;i<word.length;i++){
      console.log(word.charCodeAt(i));
      const height = h[word.charCodeAt(i) - 97];
      console.log(height);
       if(height > maxHeight){
        maxHeight = height;
       }
    }
    return width * maxHeight;
  
  }
  console.log(designerPdfViewer([1, 3, 1, 3, 1, 4, 1, 3, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],'abc'));