import { Image, Text } from '@rneui/base';
import { StyleSheet, View } from 'react-native';

const TransactionsEmpty = () => {
  return (
    <View style={style.container}>
      <Text h4 style={style.title}>
        No results for your search. Please try again with other keywords.
      </Text>
      <Image
        source={require('../../../assets/images/wallet-no-results.png')}
        style={style.image}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
