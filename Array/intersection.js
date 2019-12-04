var intersect = function(nums1, nums2) {
    const l1 = nums1.length;
    const l2 = nums2.length;
    
    const map = new Map();
    nums1.forEach(item => map.set(item,item));
    
    const set = new Set();
    nums2.forEach(item => {
        if(map.has(item)){
            set.add(item)
        } 
    });
    const intersection = [];
    for(let entries of set.entries()){
        intersection.push(entries[0]);
    }
    return intersection;
};

console.log(intersect([1,2,2,1],[2,2]));