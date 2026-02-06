import { Button, Text, SearchBar } from '@rneui/base';
import { StyleSheet, View } from 'react-native';
import { TransactionFilter } from './TransactionsContainer';
import Icon from '@react-native-vector-icons/material-icons';
import { useEffect, useRef, useState } from 'react';

type TransactionsHeaderProps = {
  activeFilter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
  onSearch: (query: string) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
};

const TransactionsHeader = ({
  activeFilter,
  onFilterChange,
  onSearch,
  searchValue,
  onSearchValueChange,
}: TransactionsHeaderProps) => {
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (text: string) => {
    onSearchValueChange(text);

    // user is typing → cancel everything
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (text === '') {
      onSearch('');
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(false);

    debounceRef.current = setTimeout(() => {
      // user stopped typing → show loading
      setIsDebouncing(true);

      // fake API delay
      setTimeout(() => {
        onSearch(text.trim());
        setIsDebouncing(false);
      }, 300); // fake backend latency
    }, 400); // debounce delay
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <>
      <View style={style.container}>
        <Text style={style.balanceTitle}>Balance</Text>
        <View style={style.balanceContainer}>
          <Text style={style.balanceAmount}>1,111.1</Text>
          <Text style={style.balanceCurrency}>USDC</Text>
        </View>
        <View style={style.filterContainer}>
          <Button
            accessible
            accessibilityRole="button"
            accessibilityLabel="Show all transactions"
            size="sm"
            radius={5}
            onPress={() => onFilterChange('all')}
            buttonStyle={[
              style.filterButton,
              activeFilter === 'all'
                ? style.activeFilterButton
                : style.inactiveFilterButton,
            ]}
          >
            All
          </Button>
          <Button
            size="sm"
            radius={5}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Show income transactions"
            onPress={() => onFilterChange('income')}
            buttonStyle={[
              style.filterButton,
              activeFilter === 'income'
                ? style.activeFilterButton
                : style.inactiveFilterButton,
            ]}
          >
            Income
          </Button>
          <Button
            size="sm"
            radius={5}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Show expenses transactions"
            onPress={() => onFilterChange('expenses')}
            buttonStyle={[
              style.filterButton,
              activeFilter === 'expenses'
                ? style.activeFilterButton
                : style.inactiveFilterButton,
            ]}
          >
            Expenses
          </Button>
        </View>
      </View>
      <SearchBar
        accessible
        accessibilityRole="search"
        accessibilityLabel="Search transactions"
        accessibilityHint="Type a merchant name to filter transactions"
        lightTheme
        placeholder="Search transactions"
        value={searchValue}
        onChangeText={handleSearchChange}
        showLoading={isDebouncing}
        searchIcon={<Icon name="search" size={20} color="#000" />}
      />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    backgroundColor: '#e6e5f8',
    borderEndEndRadius: 10,
    borderEndStartRadius: 10,
    padding: 20,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceTitle: {
    marginTop: '20%',
    marginBottom: 10,
    fontSize: 14,
    color: '#6a6a6a',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10,
  },
  balanceCurrency: {
    fontSize: 18,
    color: '#000000',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  filterButton: {
    marginRight: 10,
    padding: 5,
    width: 100,
  },
  activeFilterButton: {
    backgroundColor: '#6f2c79',
  },
  inactiveFilterButton: {
    backgroundColor: '#c9adcd',
  },
});

export default TransactionsHeader;
