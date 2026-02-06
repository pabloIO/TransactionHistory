import { Skeleton } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

const TransactionsLoader = () => {
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading transactions"
      style={style.container}
    >
      <Skeleton
        animation="pulse"
        width={'95%'}
        height={250}
        style={style.headSkeleton}
      />
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          key={index}
          animation="pulse"
          width={'95%'}
          height={60}
          style={style.listItem}
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headSkeleton: {
    borderRadius: 10,
  },
  listItem: {
    marginTop: 10,
    borderRadius: 10,
  },
});

export default TransactionsLoader;
