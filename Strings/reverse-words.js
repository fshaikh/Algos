/**
 * Given a String of length S, reverse the whole string without reversing the individual words in it.
 *  Words are separated by dots.
Input:
i.like.this.program.very.much
pqr.mno

Output:
much.very.program.this.like.i
mno.pqr
 */

 const reverseWords = (word) => {
     return word.split('.')
                .reverse()
                .join('.');
 }
 console.log(reverseWords('i.like.this.program.very.much'))