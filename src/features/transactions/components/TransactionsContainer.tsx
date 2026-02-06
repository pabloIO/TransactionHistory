import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTransactions } from '../hooks/useTransactions';
import TransactionsLoader from './TransactionsLoader.skeleton';
import TransactionsError from './TransactionsError.error';
import { FlashList } from '@shopify/flash-list';
import TransactionsHeader from './TransactionsHeader';
import { Transaction } from '../../../models/Transaction';
import TransactionsEmpty from './TransactionsEmpty';

export type TransactionFilter = 'all' | 'income' | 'expenses';

const TransactionsContainer = () => {
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    transactions,
    refetchTransactions,
  } = useTransactions(false);

  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('all');

  const renderItem = ({ item }: { item: Transaction }) => {
    // Placeholder for rendering each transaction item
    return <View>{/* Render transaction details here */}</View>;
  };

  const renderHeader = useCallback(
    () => <TransactionsHeader activeFilter={activeFilter} />,
    [activeFilter],
  );

  return (
    <View style={style.container}>
      {isFetching || isLoading ? <TransactionsLoader /> : null}
      {isError && (
        <TransactionsError refetchTransactions={refetchTransactions} />
      )}
      {isSuccess && !isLoading && (
        <FlashList<Transaction>
          ListHeaderComponent={renderHeader}
          data={transactions?.data || []}
          renderItem={renderItem}
          keyExtractor={(item: Transaction) => item.id}
          ListEmptyComponent={TransactionsEmpty}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TransactionsContainer;
