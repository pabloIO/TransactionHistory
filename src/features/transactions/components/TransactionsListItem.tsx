import { Avatar, Text } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import { Transaction } from '../../../models/Transaction';
import { StyleSheet, View } from 'react-native';
import { formatTransactionDate } from '../../../helpers/formatTransactionDate';

const TransactionListItem = ({
  amount,
  category,
  date,
  merchant,
  type,
}: Transaction) => {
  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${merchant}, ${amount} dollars, ${formatTransactionDate(
        date,
      )}`}
    >
      <ListItem bottomDivider>
        <Avatar
          rounded
          icon={{
            name: type === 'expense' ? 'money-off' : 'attach-money',
            type: 'material',
            color: type === 'expense' ? 'red' : 'green',
            size: 26,
          }}
          containerStyle={style.listItemIconContainer}
        />
        <ListItem.Content>
          <ListItem.Title style={style.title}>
            {category} - {merchant}
          </ListItem.Title>
          <ListItem.Subtitle>{type}</ListItem.Subtitle>
        </ListItem.Content>
        <View style={style.amountContainer}>
          <Text style={amount > 0 ? style.amountIncome : style.amountExpense}>
            {amount > 0 ? `+${amount}` : amount} USDC
          </Text>
          <Text style={style.dateText}>{formatTransactionDate(date)}</Text>
        </View>
      </ListItem>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  amountIncome: {
    color: 'green',
  },
  amountExpense: {
    color: 'red',
  },
  amountContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
  },
  listItemIconContainer: {
    backgroundColor: '#f0f0f0',
  },
});

export default TransactionListItem;
