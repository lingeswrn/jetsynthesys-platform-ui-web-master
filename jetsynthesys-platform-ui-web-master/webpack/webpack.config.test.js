'use strict'
const path = require('path')
const webpack = require('webpack')

const root = process.env.PWD

process.env.ENV = process.env.NODE_ENV = 'test'

module.exports = [
    {
        devtool: 'inline-source-map',
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(bower_components|node_modules)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-0', 'react'],
                    }
                },
                // .html
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loader: 'file?name=[name].[ext]',
                },
                // .css
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loader: 'style!css', // removed `autoprefixer` because of newly introduced build bug
                },
                // .styl
                {
                    test: /\.styl$/,
                    exclude: /node_modules/,
                    loader: 'style!css!stylus', // removed `autoprefixer` because of newly introduced build bug
                },
                // .svg
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    loader: 'file?name=[hash].[ext]&mimetype=image/svg+xml&limit=10000',
                },
                // .png
                {
                    test: /\.png/,
                    exclude: /node_modules/,
                    loader: 'url?mimetype=image/png',
                },
                // .jpg
                {
                    test: /\.jpg/,
                    exclude: /node_modules/,
                    loader: 'url?mimetype=image/jpg',
                },
                // .woff + .woff2
                {
                    test: /\.(woff|woff2)/,
                    exclude: /node_modules/,
                    loader: 'url?limit=10000&mimetype=application/font-woff',
                },
                // .eot + .ttf + .otf
                {
                    test: /\.(eot|ttf|otf)/,
                    exclude: /node_modules/,
                    loader: 'file',
                },
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
            root: [
                path.join(root, 'src'),
                path.join(root, 'node_modules'),
            ],
            moduleDirectories: [
                'node_modules'
            ],
            context: path.join(root, 'src'),
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'BROWSER': true,
                    'SERVICE_WORKER': false,
                    'DEBUG': false,
                    'ENV': `"${process.env.ENV}"`,
                    'NODE_ENV': `"${process.env.NODE_ENV}"`
                }
            }),
        ]
    }
]
