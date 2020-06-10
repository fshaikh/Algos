/**
 
      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1

LCA(13,1) = 8
Algorithm:
1. Start at root. 5 is not same as 13 or 1, so go to its left
2. 4 !== 13,1, left.
3. 11 !== 13,1 . Left
4. 7 !== 13,1. Left. No more left , return null
5. At 11, now go to right. 2 !== 13,1 . Left. Since no left, return null
6. 11 gets null from both left and right , so return null 
7. 4 gets null. Since there is no right, returns null
8. 5 now gets null from left-side. Traverse right sub-tree
9. 8 !== 13,1. Left
10. 13 = 13. So return 13
11. 8 gets 13 from left sub-tree. Traverse right sub-tree
12. 4 != 13,1 , go to left,  No left , so return null. Traverse right
13. 1 = 1. so return 1. 4 gets 1, so returns 1
14. 8 got non-null values from both left and right. So 8 is the LCA  =>>>>>  IMPORTANT
15. Return 8 to 3.
16. 3 now returns 8 as LCA

Try to do the above exercise for LCA(8,1). You will see that we stop at 8 and don't traverse looking for 1. So this
algorithm will only work if both nodes exist in the tree.

Try and do the above stpes for more nodes, to get an understanding of the algorithm. The code is trivial after that
For excellent explaination refer to Tusha Roy's youtube video

ASSUMPTIONS:   =>>>>>  IMPORTANT
1. Both nodes must exist in the tree
 */

 function getLCA(root, node1,node2){

        function getLCACore(node){
            if(node == null){
                return null;
            }
            // Compare nodes and not values. If we compare values, we assume that all nodes have unique values
            if(node === node1 || node === node2){
                return node.value;
            }
            const leftNode = getLCACore(node.left);
            const rightNode = getLCACore(node.right);
            // If we get non-null from both sub-trees, this is the LCA
            if(leftNode !== null && rightNode !== null){
                return node.value;
            }
            console.log(node.value)
            // return any non-null node , else return null
            return leftNode || rightNode || null;
        }
    return getLCACore(root);
 }



 const Tree = require('../Tree').BinaryTree;
 const Node = require('../Tree').Node;

 const tree = new Tree();
 tree.head = new Node(3);
 tree.head.left = new Node(5);
 tree.head.right = new Node(1);
 tree.head.left.left = new Node(6);
 tree.head.left.right = new Node(2);
 tree.head.left.right.left = new Node(7);
 tree.head.left.right.right = new Node(4);

 tree.head.right.left = new Node(0);
 tree.head.right.right = new Node(8);

 console.log(getLCA(tree.head,tree.head.left,tree.head.right))
