const DisjointSet = require('./DisjointSet').DisjointSet;

// const disjointSet = new DisjointSet([1,2,3,4,5,6,7,8]);
// console.log(disjointSet.union(1,2));
// console.log(disjointSet.union(3,4));
// console.log(disjointSet.union(5,6));
// console.log(disjointSet.union(7,8));
// console.log(disjointSet.union(1,3));
// console.log(disjointSet.union(2,4));
// console.log(disjointSet.union(1,2));

const disjointSet = new DisjointSet([1,2,3,4,5,6,7,8]);
console.log(disjointSet.union(1,2));
console.log(disjointSet.union(3,4));
console.log(disjointSet.union(5,6));
console.log(disjointSet.union(7,8));
console.log(disjointSet.union(1,3));
console.log(disjointSet.union(2,4));
console.log(disjointSet.union(1,2));
console.log(disjointSet.union(3,6));


console.log(disjointSet.extract(true))