const { merge } = require('webpack-merge');
const path = require('path');
const config = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const esCfg = {
  mode: 'production',
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(process.cwd(), 'lib/es'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};

module.exports = merge(config, esCfg);
