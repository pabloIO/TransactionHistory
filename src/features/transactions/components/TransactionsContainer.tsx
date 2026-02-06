import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTransactions } from '../hooks/useTransactions';
import TransactionsLoader from './TransactionsLoader.skeleton';
import TransactionsError from './TransactionsError.error';
import { FlashList } from '@shopify/flash-list';
import TransactionsHeader from './TransactionsHeader';
import { Transaction } from '../../../models/Transaction';
import TransactionsEmpty from './TransactionsEmpty';
import TransactionListItem from './TransactionsListItem';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('all');

  const renderItem = ({ item }: { item: Transaction }) => {
    return <TransactionListItem {...item} />;
  };

  const renderHeader = (
    <TransactionsHeader
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onSearch={setSearchQuery}
    />
  );

  const filteredTransactions = useMemo(() => {
    if (!transactions?.data) return [];

    const normalizedQuery = searchQuery.trim().toLowerCase();

    return transactions.data.filter((tx) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'income' && tx.amount > 0) ||
        (activeFilter === 'expenses' && tx.amount < 0);

      const matchesSearch =
        !normalizedQuery ||
        tx.merchant?.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });
  }, [transactions?.data, activeFilter, searchQuery]);

  return (
    <View style={style.container}>
      {isFetching || isLoading ? <TransactionsLoader /> : null}
      {isError && !isLoading && !isFetching && (
        <TransactionsError refetchTransactions={refetchTransactions} />
      )}
      {isSuccess && !isLoading && !isFetching && (
        <Animated.View
          key={`${activeFilter}-${searchQuery}`}
          entering={FadeIn}
          exiting={FadeOut}
          style={style.container}
        >
          <FlashList<Transaction>
            onRefresh={refetchTransactions}
            ListHeaderComponent={renderHeader}
            data={filteredTransactions || []}
            renderItem={renderItem}
            keyExtractor={(item: Transaction) => item.id}
            ListEmptyComponent={TransactionsEmpty}
          />
        </Animated.View>
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
