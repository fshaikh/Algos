/**
 * Given two strings, the task is to find if a string ('a') can be obtained by rotating another string ('b') by two places.
Examples:

Input : a = "amazon" 
        b = "azonam"  // rotated anti-clockwise
Output : 1

Input : a = "amazon"
        b = "onamaz"  // rotated clockwise
Output : 1
 */
const isRotated = (originalString, rotatedString) => {
    const composedString = `${originalString}${originalString}`;
    return composedString.includes(rotatedString);
};
console.log(isRotated('geeksforgeeksgeeksforgeeks','geeksgeeksfor'));

