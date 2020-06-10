/**
 Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

But the following [1,2,2,null,3,null,3] is not:

    1
   / \
  2   2
   \   \
   3    3
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  // take 2 pointers
  let leftHalf = root,
    rightHalf = root;
  return isSymmetricCore(leftHalf, rightHalf);

  function isSymmetricCore(leftHalf, rightHalf) {
    // structurally
    if (leftHalf == null && rightHalf == null) {
      return true;
    }
    if (
      (leftHalf == null && rightHalf != null) ||
      (leftHalf != null && rightHalf == null)
    ) {
      return false;
    }
    // equivalence
    if (leftHalf.val !== rightHalf.val) {
      return false;
    }
    return (
      isSymmetricCore(leftHalf.left, rightHalf.right) &&
      isSymmetricCore(leftHalf.right, rightHalf.left)
    );
  }
};
