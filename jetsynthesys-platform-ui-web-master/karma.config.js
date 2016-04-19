'use strict'
const path = require('path')
const webpack = require('webpack')

const root = process.env.PWD

process.env.ENV = process.env.NODE_ENV = 'test'

module.exports = (config) => {
    config.set({

        basePath: '',

        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'es6-shim'],

        plugins: [
            'karma-es6-shim',
            'karma-webpack',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-sourcemap-loader'
        ],

        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './test/**/*spec.js',
        ],

        exclude: [
        ],

        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './test/**/*spec.js': ['webpack'],
            './src/**/*.{js,jsx}': ['webpack'],
        },

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        port: 9876,

        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        autoWatch: true,

        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],

        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // how many browser should be started simultaneous
        concurrency: Infinity,

        webpack: require(path.join(root, 'webpack/webpack.config.test')),

        webpackServer: {
            noInfo: true
        },

    })
}
