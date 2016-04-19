'use strict'
import debug from 'debug'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import flag from 'node-env-flag'
import express from 'express'
import expressLogger from 'morgan'
import expressCORS from 'cors'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

// WIP/Reference:
//      - https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.uz502nckz
//      - https://github.com/bananaoomarang/isomorphic-redux

process.env.SERVER = true
process.env.SSL = flag(process.env.SSL, true)
process.env.LETSENCRYPT = flag(process.env.LETSENCRYPT, false) // /prod/.test(process.env.NODE_ENV)

import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import createLocation from 'history/lib/createLocation'

import createStore from './src/js/utils/createStore'
import fetchComponentData from './src/js/utils/fetchComponentData'

import routes from './src/js/routes'
import reducer from './src/js/reducers'

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'src'))

server.use(expressCORS())

const webpackCompile = (callback) => {
    if (global.webpackCompiled) return callback()

    if (/prod/.test(process.env.NODE_ENV)) {
        let webpackCompiler = webpack(require('./webpack/webpack.config.prod'))
        webpackCompiler.run((err, stats) => {
            debug('app server')('BUILD', stats)

            global.webpackCompiled = true

            if (callback) callback()
        })
    }
}

if (/prod/.test(process.env.NODE_ENV)) {
    webpackCompile()

    server.use(expressLogger('dev'))
    server.use(express.static(path.join(__dirname, 'dist'), {index: false}))
}
/* else {
    const webpackConfig = require('./webpack/webpack.config.dev')
    // webpackCompiler = webpack(require('./webpack/webpack.config.dev'))
    webpackCompiler = webpack([
        ...webpackConfig,
        // output: {
        //     ...webpackConfig.output,
        //     path: '/',
        // }
    ])

    server.use(webpackDevMiddleware(webpackCompiler, {noInfo: true}))
    server.use(webpackHotMiddleware(webpackCompiler, {log: console.log}))

    server.use(expressLogger('dev'))
    server.use(express.static(path.join(__dirname, 'src'), {index: false}))
} */

// dynamic: server routes => client routes
server.use((req, res, next) => {
    // ignore any URLs with file extensions (for now)
    if (/\..+$/gmi.test(req.url)) return next()

    // location
    const location = createLocation(req.url)

    // data store
    const store = createStore(reducer)

    // route
    match({routes, location}, (error, redirectLocation, renderProps) => {

        if (error) {
            return next(error)
        }

        // not found
        if (!renderProps) {
            return next()
        }

        const renderReactApp = () => {
            const Root = (
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            )

            // initial data store state
            const initialState = store.getState()

            // log `dist` files
            // glob(path.join(__dirname, 'dist/*'), (err, files) => console.log(files))

            webpackCompile(() => {
                const manifest = require('./dist/manifest.json')
                const webpack = require('./dist/webpack.json')

                const data = {
                    title: manifest.name,
                    initialState: JSON.stringify(initialState),
                    initialHTML: renderToString(Root),
                    engine: 'server',
                    manifest: manifest,
                    webpack: webpack,
                }

                if (res.push) {
                    res
                        .push('/manifest.json', {
                            request: {
                                accept: '*/*'
                            },
                            response: {
                                'content-type': 'application/javascript'
                            }
                        })
                        .on('error', v => v)
                }

                res.render('index.html.ejs', data)
            })
        }

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(res => {
                debug('app server')('RESPONSE', res)

                renderReactApp()
            })
            .catch(err => {
                throw next(error)
            })
    })

})

// error handler
server.use((err, req, res, next) => {
    debug('app server')('ERROR', err)
    console.log(err)

    if (err) {
        return res.status(500).end('500', {code: 500, message: 'Server Error'})
    } else {
        return res.status(404).end('404', {code: 404, message: 'Not Found'})
    }
})

server.listen = (httpPort, httpsPort, callback) => {
    const http = require('http')

    http.createServer(server).listen(httpPort, callback)

    if (flag(process.env.SSL)) {

        // HTTPS
        if (flag(process.env.LETSENCRYPT)) {

            // HTTPS: LetsEncrypt:
            const LEX = require('letsencrypt-express')

            const lex = LEX.create({
                configDir: path.join(require('os').homedir(), 'letsencrypt/etc'),
                approveRegistration: (hostname, callback) => {
                    // Note: this is the place to check your database to get the user associated with this domain
                    callback(null, {
                        domains: [hostname],
                        email: 'grimen@gmail.com',
                        agreeTos: true
                    })
                }
            })

            lex.onRequest = server

            lex.listen([process.env.PORT], [process.env.PORT_HTTPS], callback)

        } else {

            // HTTPS: Local/SSL
            const pem = require('pem')
            const https = require('https')
            const spdy = require('spdy')

            pem.createCertificate({days: 30, selfSigned: true}, (err, keys) => {
                const options = {
                    // key: fs.readFileSync(`${__dirname}/ssl/${process.env.NODE_ENV}/server.key`),
                    // cert: fs.readFileSync(`${__dirname}/ssl/${process.env.NODE_ENV}/server.crt`),
                    // ca: null,

                    key: keys.serviceKey,
                    cert: keys.certificate,

                    spdy: {
                        protocols: ['h2', 'spdy/3.1'],
                        plain: false,
                    }
                }

                // https.createServer(options, server).listen(httpsPort, callback)
                spdy.createServer(options, server).listen(httpsPort, callback)
            })

        }
    }
}

export default server
