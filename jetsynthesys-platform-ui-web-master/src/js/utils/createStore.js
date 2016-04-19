'use strict'
import debug from 'debug'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'

const _createStore = (reducers = () => {}, initialState = {}) => {

    let devTools = f => f
    // let devTools = DevTools.instrument() // LATER: redux debugging tools - https://github.com/gaearon/redux-devtools

    if (typeof window !== 'undefined') {
        devTools = (window.devToolsExtension ? window.devToolsExtension() : devTools)
    }

    let middleware = [
        thunk,
        promise,
        routerMiddleware(browserHistory)
    ]

    if (process.env.DEBUG) {
        middleware.push(
            logger({
                collapsed: true
            })
        )
    }

    const enhancer = compose(
        applyMiddleware(...middleware),
        devTools,
    )

    const store = createStore(
        reducers,
        initialState,
        enhancer
    )

    if (module.hot) {
        // Enable React hot module replacement for store reducers.
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        });
    }

    debug('app store')('create')

    return store
}

export default _createStore
