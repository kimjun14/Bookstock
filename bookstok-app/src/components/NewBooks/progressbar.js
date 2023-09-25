function calculateProgress(currentPrice, startingPrice) {
    if (startingPrice === 0) {
      return 0;
    }
    const progress = ((currentPrice / startingPrice) * 100).toFixed(2);
    return progress > 100 ? 100 : progress; // 진행률 최대 100%
  }

  export default calculateProgress;