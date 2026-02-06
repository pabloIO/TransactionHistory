import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../../../api/transactionApi';

export const useTransactions = (forceError: boolean) => {
  const {
    isFetching,
    isError,
    isSuccess,
    isLoading,
    data: transactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(forceError),
    retry: 0,
  });

  return {
    isFetching,
    isError,
    isSuccess,
    isLoading,
    transactions,
    refetchTransactions,
  };
};
