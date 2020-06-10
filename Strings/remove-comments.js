/**
 
 */

var removeComments = function(source) {


    const commentsIndexMap = new Map();
    let modifiedSource = [], multiLineStartFound = false;
    for(let i=0;i<source.length;i++){
        const line = source[i];
        if(line.trim().endsWith("*/")){
            commentsIndexMap.set(i,i);
            multiLineStartFound = false;
            continue;
            
        }
        if(line.trim().startsWith("//") || multiLineStartFound){
            commentsIndexMap.set(i,);
            continue;
        }
        if(line.trim().substr(0,2) === '/*' && line.trim().endsWith("*/")){
            commentsIndexMap.set(i,i);
            continue;
        }
        if(line.trim().substr(0,2) === '/*') {
            commentsIndexMap.set(i,i);
            multiLineStartFound = true
            continue;
        }
        
    }
    for(let i=0;i<source.length;i++){
        if(!commentsIndexMap.has(i)){
            modifiedSource.push(source[i]); 
        }else{
            console.log(source[i], source[i].startsWith(' ') || source[i].endsWith(' '));
        }
    }
    return modifiedSource;
};

console.log(removeComments(["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]))

// ["int a, b, c;","a = b + c;","}"]
// ["  ","int a, b, c;","a = b + c;","}"]

