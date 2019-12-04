

var twoSum = function(nums, target) {
    const map = new Map();
    for (let index = 0; index < nums.length; index++) {
        const diff = target - nums[index];
        if(map.has(diff)){
            return [map.get(diff),index];
        }
        map.set(nums[index],index);
    }

  };
  console.log(twoSum([2,8,6,10],12));


  