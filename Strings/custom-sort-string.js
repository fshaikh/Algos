/**
 S and T are strings composed of lowercase letters. In S, no letter occurs more than once.

S was sorted in some custom order previously. We want to permute the characters of T so that 
they match the order that S was sorted. More specifically, if x occurs before y in S, then x should
occur before y in the returned string.

Return any permutation of T (as a string) that satisfies this property.

Example :
Input: 
S = "cba"
T = "abcd"
Output: "cbad"
Explanation: 
"a", "b", "c" appear in S, so the order of "a", "b", "c" should be "c", "b", and "a". 
Since "d" does not appear in S, it can be at any position in T. "dcba", "cdba", "cbda" are also valid outputs.
 

Note:

S has length at most 26, and no character is repeated in S.
T has length at most 200.
S and T consist of lowercase letters only.
 */

 //#region Approach 1 - 
 /**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
var customSortString = function(S, T) {
    // iterate S and store in map (key = letter, value = index)
    const map = new Map();
    for(let i=0;i<S.length;i++){
        map.set(S[i],i);
    }

    const tArray = T.split('');
    const tArrayFiltered = tArray.filter(item => map.has(item));
    const tArrayNotPresent = tArray.filter(item => !map.has(item))

    tArrayFiltered.sort((a,b) => {
        const aIndex = map.get(a);
        const bIndex = map.get(b);
        if(aIndex < bIndex){
                return -1;
            }
            if(aIndex > bIndex){
                return 1;
            }
            return 0;
    });
    // return sorted array
    return [...tArrayFiltered, ...tArrayNotPresent].join('')
        
};
 //#endregion Approach 1

 //#region Approach 2
 /**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
var customSortString = function(S, T) {
    // iterate S and store in map (key = letter, value = index)
    const map = new Map();
    for(let i=0;i<T.length;i++){
        const count = map.get(T[i]) || 0;
        map.set(T[i],count + 1);
    }
    let sortedString = '';
    for(let i=0;i<S.length;i++){
        const c = map.get(S[i]) || 0;
        if(c !== 0){
            for(let j=0;j<c;j++){
                sortedString = sortedString + S[i] ;
            }
            map.delete(S[i]);
        }
    }
    for(let entry of map.entries()){
        for(let i=0;i<entry[1];i++){
            sortedString = sortedString + entry[0]
        }
        
    }   
    return sortedString
};
 // #endregion Approach 2