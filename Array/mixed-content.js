/**
 * Let’s say we have an array of strings and other types and we need to
 *  join all the strings and ignore the other types.

const dataArray = [0, 'H', {}, 'e', Math.PI, 'l', 'l', 2/9, 'o!'];
The desired output is “Hello!”.
 * @param array 
 */
export const mixedContent = (array) => {
    return array
            .filter(item => typeof item === 'string')
            .join('');
}