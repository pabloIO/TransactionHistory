import { Image, Text } from '@rneui/base';
import { StyleSheet, TouchableOpacity } from 'react-native';

const TransactionsEmpty = () => {
  return (
    <TouchableOpacity style={style.container}>
      <Text h4 style={style.title}>
        No results for your search. Please try again later.
      </Text>
      <Image
        source={require('../../../assets/images/wallet-no-results.png')}
        style={style.image}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default TransactionsEmpty;
