// fetchTransactions.test.ts
import { fetchTransactions } from '../transactionApi';
import transactions from '../../data/transactions.json';

describe('fetchTransactions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('returns transactions when forceError is false', async () => {
    // Prevent random error
    jest.spyOn(Math, 'random').mockReturnValue(0.9);

    const promise = fetchTransactions(false);

    // fast-forward the timeout
    jest.advanceTimersByTime(2000);

    const result = await promise;

    expect(result).toEqual({
      data: transactions,
      total: transactions.length,
    });
  });

  it('throws an error when forceError is true', async () => {
    const promise = fetchTransactions(true);

    jest.advanceTimersByTime(2000);

    await expect(promise).rejects.toThrow('Simulated API error');
  });
});
