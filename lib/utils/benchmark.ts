export function percentileFromTimes(userTimeMs: number, peerTimesMs: number[]) {
  if (peerTimesMs.length === 0) {
    return 100;
  }

  const slowerOrEqual = peerTimesMs.filter((t) => t >= userTimeMs).length;
  return Math.round((slowerOrEqual / peerTimesMs.length) * 100);
}

export function percentileRank(userMs: number, peerTimesMs: number[]): number {
  return percentileFromTimes(userMs, peerTimesMs);
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

export function topPercentileLabel(percentile: number): string {
  return getBenchmarkMessage(percentile);
}

/** Mock peer times for demo benchmarking */
export const MOCK_PEER_TIMES_MS = [
  8200, 9100, 7400, 12000, 6800, 10500, 9900, 7600, 11200, 8500,
  9300, 7100, 10800, 8700, 9500, 7900, 10100, 8800, 11500, 7200,
];
