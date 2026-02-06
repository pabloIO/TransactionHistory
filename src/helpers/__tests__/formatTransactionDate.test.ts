import { formatTransactionDate } from '../formatTransactionDate';

describe('formatTransactionDate', () => {
  it('formats ISO date correctly', () => {
    const result = formatTransactionDate('2025-01-01T08:00:00Z');
    expect(result).toBe('Jan 1, 2025 • 04:00 AM');
  });
});
