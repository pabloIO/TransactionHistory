# Transactions History App by Pablo Montes Jordan

This project shows a UI of a Transactions History app made with React Native CLI

## Setup & Installation

To install the project and run it locally do the following steps:

```bash
git clone https://github.com/pabloIO/TransactionHistory.git
cd TransactionsHistory
```

Then install NPM dependencies:

```bash
npm install
```

For iOS install CocoaPods dependencies:

```bash
cd ios
bundle exec pod install
```

## Run the app

Once you have all your dependencies installed run the project, execute the following command from the root folder:

```bash
npx react-native run-ios
npx react-native run-android
```

## ⚠️ WARNING

To ensure the best possible experience using the app, use the Light Theme both on iOS and Android, next versions of the app will have theme support.

## Mental model to build this project

1. Read and understand requirements, based on these, check all dependencies that will be neccesary
2. Define what architecture to use
3. Look for inspiration in UI mockups
4. Start coding🔥

### What architecture?

The file architecture is defined by the Feature based Architecture, the main reason for choosing this architecture is because is comprensible for any developer or reviewer and can scale as the project grows, I think it's better to think about scaling first because all software projects tends to grow it's codebase and can get messy in the future.

### Design

The mockup for the UI was inspired using this [design](https://dribbble.com/shots/20257091-Wallet-App-Exploration), this accelerates development by not wasting time thinking about design.

I also used AI to create images for the Loading and Error states.

### Fake API strategy

The approach I took to get the data, was creating a local JSON file with 50 items taking the interface object provided:

```javascript
export interface Transaction {
  id: string;
  merchant: string; // e.g., "Starbucks", "Direct Deposit"
  amount: number; // positive for income, negative for expenses
  date: string; // ISO 8601 format
  category: string; // e.g., "Food & Drink", "Income", "Shopping"
  type: 'income' | 'expense';
}
```

Create a function `transactionApi` that will simulate an API call using a `timeOut`, to simulate the error, in the 25% of cases will show an intentional error and also accepts a `forceError` to respond only errors.

### Coding logic

Then start to build the layout, implement the Skeleton feature because the UI library I choose, `React Native Elements` had this feature.

Then used `React Native Query` to handle all API states needed: `isLoading`, `isFetching`, `isError`, `isSuccess`, `data`, `refetch`, encapsulating all this logic in a custom hook `useTransactions` to return this data to the main component `TransactionsContainer`

The list used in this case was `FlashList` for its performance. Then create a Header and add it to the HeaderComponent in the list, that will show the Balance of the user according to the mockup. Add two buttons that will be the filters and a search bar under the header, the search filters based on the `merchant` variable.

Add the logic to filter the transactions list results based on the `type` variable and search query, applying a debouncing function.

Then create a ListItem component to render each row, create a helper function named `formatTransactionDate` to format the date in the UI, and finally glue it to the FlashList.

After all of this, I had to debug:

- When the search query is written and a filter is applied, the text query was deleted, so the `searchValue` state variable that was inside Header component, the solution was to lift up the searchValue state to the TransctionsContainer to avoid this issue.
- When the app reloaded, the Header was being showed at the same time as the skeleton, so I added conditions to both component renders. The same with the Error state.

Finally create tests to test the `formatTransactionDate` and `fetchTransactions` functions with `jest`.

### Trade-offs

- Header state lifted vs local state: Because the header can be remounted due to list animations, I lifted only the critical state that must persist
- Animations correctness over flashiness: I limited animations to meaningful state transitions to avoid conflicts with list virtualization
- Filtering on the client (not server-driven): For the expected dataset size, client-side filtering provided better UX with minimal complexity

### What can be improved with more time

- Infinite scroll feature to enhance the performance of the list, this would need a real API
- API Endpoints that would handle `search` and `filters`
- Enhance the animations to get a better experience
- More tests on functions and also components
- Check what states can be better collocated
- Optimizations using `useCallback` and `useMemo/memo`
- Theme config
- Navigation logic and more features
