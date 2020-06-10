function leftRotate(array, d){
      for(let i=0;i<d;i++){
         leftRotateByOne(array);
      }
      return array;
    }
    
    function leftRotateByOne(array){
      let first = array[0];
      for(let i=0;i<array.length;i++){
        array[i] = array[i+1];
      }
      array[array.length-1] = first;
    }

    function rightRotateByOne(array){
        let last = array[array.length - 1];
        for(let i=array.length - 1;i>0;i--){
          array[i] = array[i-1];
        }
        array[0] = last;
        return array;
      }

    console.log(rightRotateByOne([1,2,3,4,5],4))