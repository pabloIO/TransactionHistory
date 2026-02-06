/**
 * Author: Pablo Montes Jordan
 *
 * @format
 */

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TransactionsContainer from './src/features/transactions/components/TransactionsContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={style.container}>
          <TransactionsContainer />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
