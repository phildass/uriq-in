export function percentileFromTimes(userTimeMs: number, peerTimesMs: number[]) {
  if (peerTimesMs.length === 0) {
    return 100;
  }

  const slowerOrEqual = peerTimesMs.filter((t) => t >= userTimeMs).length;
  return Math.round((slowerOrEqual / peerTimesMs.length) * 100);
}

export function getBenchmarkMessage(percentile: number) {
  const p = Math.max(1, Math.min(99, Math.round(percentile)));

  if (p >= 95) {
    return "Your speed matches the top 5% of candidates clearing corporate aptitude rounds.";
  }

  if (p >= 80) {
    return "You are in the top 20 of the fastest responders today.";
  }

  if (p >= 50) {
    return "You are performing ahead of average responders in this module.";
  }

  return "Steady momentum - your speed is improving with each round.";
}
