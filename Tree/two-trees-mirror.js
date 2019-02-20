/**
 * Given 2 binary trees, find if they are mirror of each other
 */

const isMirror = (node1, node2) => {
    if (node1 == null && node2 == null) {
        return true;
    }

    if(node1 == null || node2 == null){
        return false;
    }
    if (node1.value !== node2.value ) {
        return false;
    }
    return isMirror(node1.left, node2.right) &&
           isMirror(node1.right, node2.left);
}