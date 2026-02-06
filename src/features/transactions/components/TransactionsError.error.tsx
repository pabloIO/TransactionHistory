import { Image, Text } from '@rneui/base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type TransactionsErrorProps = {
  refetchTransactions: () => void;
};

const TransactionsError = ({ refetchTransactions }: TransactionsErrorProps) => {
  return (
    <TouchableOpacity style={style.container} onPress={refetchTransactions}>
      <Animated.View entering={FadeIn}>
        <Text h4 style={style.title}>
          Oops! Something went wrong. Please try again later.
        </Text>
        <Image
          source={require('../../../assets/images/wallet-error.png')}
          style={style.image}
        />
      </Animated.View>
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

export default TransactionsError;
