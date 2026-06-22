export function percentileRank(userMs: number, peerTimesMs: number[]): number {
  if (peerTimesMs.length === 0) return 50;
  const faster = peerTimesMs.filter((t) => t < userMs).length;
  return Math.round((faster / peerTimesMs.length) * 100);
}

export function topPercentileLabel(percentile: number): string {
  const top = 100 - percentile;
  if (top <= 5) return `Your speed matches the top ${top}% of candidates clearing corporate aptitude rounds.`;
  if (top <= 10) return `You are in the top ${Math.max(1, Math.round(top))}% of fastest responders today.`;
  if (top <= 50) return `You are in the top ${Math.max(1, Math.round(top))} of the fastest responders today.`;
  return `You solved faster than ${percentile}% of peers in this module.`;
}

/** Mock peer times for demo benchmarking */
export const MOCK_PEER_TIMES_MS = [
  8200, 9100, 7400, 12000, 6800, 10500, 9900, 7600, 11200, 8500,
  9300, 7100, 10800, 8700, 9500, 7900, 10100, 8800, 11500, 7200,
];
