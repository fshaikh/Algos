# Binary Search Tree
All keys to the left of a node are less than the node
All keys to the right of the node are greater than the node
This property is applied to all subtrees

        Search      Insert          Delete
        O(logN)     O(logN)         O(logN)
                    + Rebalance     + Rebalance

Analysis:
Consider 'N' nodes of a BST. 
Height of a BST is between : logN < Height N
So the best case time complexity for search in a BST is O(logN) and worst case is O(N)

# Algorithms
Search
Insert
Delete
Verify if a given tree is a BST
