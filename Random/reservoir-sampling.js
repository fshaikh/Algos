/**
Given a array of numbers of size N, return 'k' random numbers from the list

Example 1:
array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], k = 3
Returns: 3, 7, 1 (one possible output)

 */

function getKSamples(array, k) {
  const samples = [],
    set = new Set();
  let counter = k;
  while (counter > 0 || samples.length !== k) {
    for (let i = 0; i < k; i++) {
      const index = Math.ceil((Math.random(0, 1) * 100) % array.length);
      // console.log(index)
      if (!set.has(index)) {
        samples.push(array[index]);
        if(samples.length === k){
            return samples;
        }
        set.add(index);
        counter--;
      }
    }
  }

  return samples;
}

console.log(getKSamples([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 5));
