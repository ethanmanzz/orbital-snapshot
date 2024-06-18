module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-optional-catch-binding', { loose: true }],
      ['@babel/plugin-transform-nullish-coalescing-operator', { loose: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      '@babel/plugin-transform-numeric-separator',
      '@babel/plugin-transform-logical-assignment-operators',
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-async-generator-functions',
      '@babel/plugin-transform-object-rest-spread',
      'react-native-reanimated/plugin'
    ]
  };
};

