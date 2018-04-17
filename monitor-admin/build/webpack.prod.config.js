const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendors',
            // filename: 'vendors.[hash].js'
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            // {
            //     from: 'src/styles/simplemde.min.css'
            // },
            // {
            //     from: 'src/styles/cropper.min.css'
            // },
            // {
            //     from: 'td_icon.ico'
            // },
            // {
            //     from: 'src/styles/fonts',
            //     to: 'fonts'
            // },
            {
                from: 'src/views/charts/alertify.js'
              },
            {
                from: 'favicon.ico',
                to:"../"
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
                from: 'src/views/charts/echarts-all.js'
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
            //  from: 'index.html',
            //  to:"../"
            // }
        ], {
            // ignore: [
            //     'text-editor.vue'
            // ]
        }),
        new HtmlWebpackPlugin({
            title: 'monitor admin v' + package.version,
            // favicon: '../td_icon.ico',
            filename: '../index.html',
            // chunks:['main'],
            template: './src/template/index.ejs',
            inject: true,
            // xhtml:true
        }),
       
    ]
});
