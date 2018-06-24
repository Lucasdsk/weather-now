const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
    app: './src/index.js',
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve('./src'),
    port: 9000,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@controllers': path.resolve(__dirname, 'src/controllers/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
    },
  },
};
