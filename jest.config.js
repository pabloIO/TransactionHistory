module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@rneui/base' +
      '|@rneui/themed' +
      '|react-native-vector-icons' +
      '|@shopify/flash-list' +
      ')/)',
  ],
};
