/**
 * Given array of sentences, return the set of words that are in one
 *  sentence but not all.

For example:

"My dog eats food"
"She eats food too"
"My dog food is good good"

Would return ['She', 'too', 'is', 'good']
 */

 const wordsInOnlyOneSentence = (sentences) => {
     const words = sentences.reduce((w, sentence) => {
        w.push(...sentence.split(' '));
        return w;
     },[]);
     const map = new Map();
     words.forEach(word => {
         if(map.has(word)){
             let count = map.get(word);
             map.set(word,++count);
         }else{
             map.set(word,1);
         }
     });
     const uniqueWords = [];
     for (const iterator of map.entries()) {
         if(iterator[1] === 1){
            uniqueWords.push(iterator[0]);
         }
     }
     return uniqueWords;
 }

 console.log(wordsInOnlyOneSentence([
    "My dog eats food",
    "She eats food too",
    "My dog food is good good"
 ]));