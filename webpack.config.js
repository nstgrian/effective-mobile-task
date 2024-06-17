const path = require('path');

module.exports = {
  entry: './src/user-history/static/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'bundle.js',
  },
  mode: 'development',
    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};