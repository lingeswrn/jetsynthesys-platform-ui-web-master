'use strict'
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const root = process.env.PWD
const manifest = require('../src/manifest.json')

process.env.PORT = process.env.PORT || 5100
process.env.ENV = process.env.NODE_ENV = 'development'

module.exports = [
    {
        name: 'root',
        target: 'web',
        debug: false,
        cache: false,
        entry: {
            vendor: [],
            bundle: [
                'webpack-dev-server/client?http://0.0.0.0:5100',
                'webpack/hot/dev-server',
                path.join(root, 'src/js/index')
            ],
        },
        output: {
            path: path.join(root, 'dist'),
            filename: '[name].js',
            chunkFilename: '[name].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.css', '.styl'],
            root: [
                path.join(root, 'src'),
                path.join(root, 'node_modules'),
            ],
            moduleDirectories: [
                'node_modules'
            ],
            context: path.join(root, 'src')
        },
        module: {
            loaders: [
                // .js
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules|serviceworker/,
                    loader: 'babel',
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
                    // loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer?browsers=last 2 version'),
                    loader: ExtractTextPlugin.extract('style-loader', 'css'), // removed `autoprefixer` because of newly introduced build bug
                },
                // .styl
                {
                    test: /\.styl$/,
                    exclude: /node_modules/,
                    // loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer?browsers=last 2 version!stylus'),
                    loader: ExtractTextPlugin.extract('style-loader', 'css!stylus'), // removed `autoprefixer` because of newly introduced build bug
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
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'BROWSER': true,
                    'SERVICE_WORKER': false,
                    'DEBUG': true,
                    'ENV': `"${process.env.ENV}"`,
                    'NODE_ENV': `"${process.env.NODE_ENV}"`,
                    'SSL': process.env.SSL,
                    'PORT': process.env.PORT,
                    'PORT_HTTPS': process.env.PORT_HTTPS,
                }
            }),
            new ExtractTextPlugin('[name].css', {
                allChunks: true
            }),
            new CopyWebpackPlugin([
                { from: './src/manifest.json', to: 'manifest.json' },
                { from: './src/assets', to: 'assets' },
            ]),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            function RenderWebpackStatsManifest () {
                this.plugin('done', (stats) => {
                    const data = stats.toJson({
                        hash: true,
                        version: true,
                        timings: false,
                        assets: true,
                        chunks: true,
                        chunkModules: false,
                        modules: false,
                        children: false,
                        cached: false,
                        reasons: false,
                        source: false,
                        errorDetails: false,
                        chunkOrigins: false,
                        modulesSort: false,
                        chunksSort: true,
                        assetsSort: true,
                    })

                    fs.writeFileSync(
                        path.join(root, 'dist/webpack.json'),
                        JSON.stringify(data, null, '    ')
                    )
                })
            },
            function RenderServiceWorker () {
                this.plugin('done', (stats) => {
                    const templatePath = path.join(root, 'src/serviceworker.js')
                    const templateString = fs.readFileSync(templatePath, 'utf8')

                    const data = stats.toJson({
                        hash: true,
                        version: true,
                        timings: false,
                        assets: true,
                        chunks: true,
                        chunkModules: false,
                        modules: false,
                        children: false,
                        cached: false,
                        reasons: false,
                        source: false,
                        errorDetails: false,
                        chunkOrigins: false,
                        modulesSort: false,
                        chunksSort: true,
                        assetsSort: true,
                    })

                    fs.writeFileSync(
                        path.join(root, 'dist/serviceworker.js'),
                        ejs.compile(templateString)(data)
                    )
                })
            },
            function RenderHTML () {
                this.plugin('done', (stats) => {
                    const templatePath = path.join(root, 'src/index.html.ejs')
                    const templateString = fs.readFileSync(templatePath, 'utf8')

                    const data = {
                        title: manifest.name,
                        initialState: JSON.stringify({}),
                        initialHTML: '',
                        engine: 'client',
                        manifest: manifest,
                        webpack: stats.toJson({
                            hash: true,
                            version: true,
                            timings: false,
                            assets: true,
                            chunks: true,
                            chunkModules: false,
                            modules: false,
                            children: false,
                            cached: false,
                            reasons: false,
                            source: false,
                            errorDetails: false,
                            chunkOrigins: false,
                            modulesSort: false,
                            chunksSort: true,
                            assetsSort: true,
                        }),
                    }

                    fs.writeFileSync(
                        path.join(root, 'dist/index.html'),
                        ejs.compile(templateString)(data)
                    )
                })
            },
        ],
        devtool: 'eval', // 'eval-source-map'
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            contentBase: path.join(root, 'dist'),
            progress: true,
            colors: true,
            port: process.env.PORT
        },
        stylus: {
            use: [
                require('nib')(),
                require('poststylus')()
            ]
        },
    }
]
