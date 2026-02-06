import { Avatar } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import { Transaction } from '../../../models/Transaction';

const TransactionListItem = ({
  amount,
  category,
  date,
  merchant,
  type,
}: Transaction) => {
  return (
    <ListItem bottomDivider>
      {/* <Avatar source={{ uri: l.avatar_url }} /> */}
      <ListItem.Content>
        <ListItem.Title>{merchant}</ListItem.Title>
        <ListItem.Subtitle>{type}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default TransactionListItem;
