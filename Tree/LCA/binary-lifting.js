/**
 Given a node in a rooted tree, its immediate parent(ancestor) is 2^0 = 1. So we always jump 2^k to find the 
 ancestors. For eg: 2^0 = 1, 2^1 = 2, 2^2 = 4. So ancestor of node at a distance 2^k from node.

 table[node][i] = ancestor of node at a distance 2^i from node
  For eg: ancestor of 7 at a distance 2^0 from 7 = 11, at a distance 2^1 from 7 = 4

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1

table[13][0] = 8,  table[13][1] = 5
table[1][0] = 4, table[1][1] = 8 
 */