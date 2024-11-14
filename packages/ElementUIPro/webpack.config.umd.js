const { merge } = require('webpack-merge');
const path = require('path');
const config = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const umdCfg = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib/umd'),
    filename: 'index.js',
    library: {
      name: 'ElementUIPro',
      type: 'umd',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};

module.exports = merge(config, umdCfg);
