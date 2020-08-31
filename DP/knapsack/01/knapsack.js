/**
 * Given a knapsack of Weight W, weights of each item , profits of each item, find the maximum profit
 by filling knapsack with items with the constraint that total weight of items put in the knapsack cannot
 exceed W
 Input: weights = [3,4,2,5], profits = [1,5,2,6], W = 6
 Output: Max profit
 */

function getMaximumProfit(weights, profit, maxWeight) {
  const dp = [];
  // for memoization, look at what us being passed in recursive function. w and maxW.
  // so we create a dp array of size: [w+1][maxW+1]
  for (let i = 0; i <= weights.length; i++) {
    dp[i] = [];
    for (let j = 0; j <= maxWeight; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = -1;
      }
    }
  }

  const maxProfit = getMaximumProfitCore(weights.length, maxWeight);
  console.log(dp)
  return maxProfit;
  function getMaximumProfitCore(w, maxW) {
    // base condition
    if (w === 0 || maxW === 0) {
      return 0;
    }
    if (dp[w][maxW] !== -1) {
      return dp[w][maxW];
    }
    // if weight > maxW, cannot pick the item
    if (weights[w - 1] > maxW) {
      const profitWhenNotPicked =  getMaximumProfitCore(w - 1, maxW);
      dp[w][maxW] = profitWhenNotPicked
      return profitWhenNotPicked
    }
    // we have a choice to either pick the item or not
    const profitWhenChoice = Math.max(
      profit[w - 1] + getMaximumProfitCore(w - 1, maxW - weights[w - 1]), // pick the item ,so we reduce maxW
      getMaximumProfitCore(w - 1, maxW) // do not pick the item, so we do not reduce maxW
    );
    dp[w][maxW] = profitWhenChoice;
    return profitWhenChoice
  }
}

console.log(getMaximumProfit([1, 2, 3, 4], [1, 2, 3, 4], 5));
