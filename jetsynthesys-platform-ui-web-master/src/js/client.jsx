'use strict'
import debug from 'debug'
import { push } from 'react-router-redux'

import createStore from './utils/createStore'
import createHistory from './utils/createHistory'
import createApp from './utils/createApp'

// REVIEW: Make `index.html` component? - https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/helpers/Html.js

// debug
if (process.env.BROWSER) {
    window.localStorage.debug = 'app*'
}

// isomorphic: initial data state
let initialState = window.__INITIAL_STATE__ || {}

// styles
require('../css/index.styl') // NOTE: ES6 `import` don't work - WebPack loader issue

debug('app')('loaded')
debug('app')('source', process.env.BROWSER ? 'client' : 'server')

// data reducer
import reducer from './reducers'

// data store
const store = createStore(reducer, initialState)

// routing history
const history = createHistory(store)

// routes
import routes from './routes'

const app = createApp(store, history, routes)

// app.go('/')

// splash screen: hide
if (process.env.BROWSER) {
    setTimeout(() => {
        document.body.setAttribute('data-loaded', 'true')
    }, 300)
}

if (process.env.SERVICE_WORKER) {
    if ('serviceWorker' in navigator) {
        debug('app service-worker')('SUPPORTED')

        const enableServiceWorker = /dev/.test(process.env.ENV)

        if (enableServiceWorker) {
            debug('app service-worker')('ENABLED')
            navigator.serviceWorker.register('/serviceworker.js')
        } else {
            debug('app service-worker')('DISABLED')
        }

    } else {
       debug('app service-worker')('NOT SUPPORTED')
    }
}


window.app = app
