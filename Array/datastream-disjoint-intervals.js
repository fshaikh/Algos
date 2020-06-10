/**
 * Initialize your data structure here.
 */
var SummaryRanges = function() {
    this.arr = []
};

/** 
 * @param {number} val
 * @return {void}
 */
SummaryRanges.prototype.addNum = function(val) {
    // if val exists, return
    // if val does not exist, add
    // get greatest value lesser than val,
    // get smallest value greater than val
    // if either difference is not 1, add val
    // if both difference is 1, merge 
    // look for difference 1, merge
    this.arr[val] = true
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function() {
    let rtn= [], start = -1
  for (let i = 0; i <= this.arr.length; i++) {
    if (start == -1) {
      if (this.arr[i]) {
        start = i
        continue
      }
    } else {
      if (!this.arr[i]) {
        rtn.push([start, i - 1])
        start = -1
        continue
      }
    }
  }
  return rtn
};

/** 
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(val)
 * var param_2 = obj.getIntervals()
 */
var obj = new SummaryRanges()
obj.addNum(1)
var param_2 = obj.getIntervals()