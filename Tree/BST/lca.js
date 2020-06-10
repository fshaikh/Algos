var lowestCommonAncestor = function(root, p, q) {
    function getLCACore(node){
            if(node == null){
                return null;
            }
            if(node.val > p.val && node.val > q.val){
                 return getLCACore(node.left);
            }
            else if(node.val < p.val && node.val < q.val){
                 return getLCACore(node.right);
            }else{
                return node;
            }
            
        }
    return getLCACore(root);
};