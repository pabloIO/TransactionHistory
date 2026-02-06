import { Transaction } from '../models/Transaction';
import transactions from '../data/transactions.json';

interface TransactionsResponse {
  data: Transaction[];
  total: number;
}

export async function fetchTransactions(
  forceError: boolean,
): Promise<TransactionsResponse> {
  await new Promise<void>((resolve: () => void) => {
    setTimeout(resolve, 2000);
  });

  if (forceError || Math.random() < 0.25) {
    throw new Error('Simulated API error');
  }

  return {
    data: transactions as Transaction[],
    total: transactions.length,
  };
}
