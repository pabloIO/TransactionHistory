import { Button, Text } from '@rneui/base';
import { StyleSheet, View } from 'react-native';
import { TransactionFilter } from './TransactionsContainer';

type TransactionsHeaderProps = {
  activeFilter: TransactionFilter;
};

const TransactionsHeader = ({ activeFilter }: TransactionsHeaderProps) => {
  return (
    <View style={style.container}>
      <Text style={style.balanceTitle}>Balance</Text>
      <View style={style.balanceContainer}>
        <Text style={style.balanceAmount}>1,111.1</Text>
        <Text style={style.balanceCurrency}>USDC</Text>
      </View>
      <View style={style.filterContainer}>
        <Button
          size="sm"
          radius={5}
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
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    backgroundColor: '#deb9f1',
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
