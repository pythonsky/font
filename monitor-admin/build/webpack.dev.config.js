const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
  const buf = 'export default "development";';
  fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vender-exten', 'vender-base'],
      minChunks: Infinity
    }),
    // new HtmlWebpackPlugin({
    //     title: 'iView admin v' + package.version,
    //     filename: '../index.html',
    //     template: './src/template/index.ejs',
    //     inject: false,
    //     // xhtml:true
    // }),
    new CopyWebpackPlugin([{
        from: 'src/views/charts/echarts-all.js'
      },
      {
        from: 'src/views/charts/alertify.js'
      },
      {
        from: 'src/views/charts/alertify.default.css'
      },
      {
        from: 'src/views/charts/alertify.core.css'
      },
      {
        from: 'src/views/charts/alertify.bootstrap.css'
      },
      {
        from: 'src/views/main-components/theme-switch/theme'
      },
      {
        from: 'src/views/charts/jquery.mCustomScrollbar.css'
      },
      {
        from: 'src/views/charts/mCSB_buttons.png'
      },
      {
        from: 'src/images'
      },
      // {
      //   from: 'src/views/my-components/text-editor/tinymce'
      // }
    ], {
      ignore: [
        'text-editor.vue'
      ]
    })
  ]
});
