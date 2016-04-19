'use strict'

// -----------------------
//      ENV
// --------------------

process.env.DEBUG = process.env.DEBUG || 'app*'
process.env.PORT = process.env.PORT || 5100
process.env.PORT_HTTPS = process.env.PORT_HTTPS || 5101
process.env.BABEL_ENV = process.env.BABEL_ENV || 'production' // NOTE: avoid `.babelrc` issue with React Hot Reload


// -----------------------
//      COMPILATION
// --------------------

require('babel-register')()


// -----------------------
//      EXCEPTIONS
// --------------------

require('pretty-error').start()


// -----------------------
//      START
// --------------------

let debug = require('debug')

debug.enable(process.env.DEBUG)

debug('app')('starting...')

const server = require('./server')

server.listen(process.env.PORT, process.env.PORT_HTTPS, () => {
    debug('app server')(`HTTPS listening on port`, process.env.PORT_HTTPS)
})
