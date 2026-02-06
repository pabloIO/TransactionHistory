import { Skeleton } from '@rneui/themed';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTransactions } from '../hooks/useTransactions';
import TransactionsLoader from './TransactionsLoader.skeleton';
import TransactionsError from './TransactionsError.error';

const TransactionsContainer = () => {
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    transactions,
    refetchTransactions,
  } = useTransactions(true);

  console.log('TransactionsContainer render', transactions);

  return (
    <View style={style.container}>
      {isFetching || isLoading ? <TransactionsLoader /> : null}
      {isError && (
        <TransactionsError refetchTransactions={refetchTransactions} />
      )}
      {isSuccess && null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TransactionsContainer;
