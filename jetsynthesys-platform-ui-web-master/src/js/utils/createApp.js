'use strict'
import debug from 'debug'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { push } from 'react-router-redux'

const _createApp = (store, history, routes, render = ReactDOM.render) => {

    const Root = (
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
    )

    const root = document.getElementById('root')
    let app = render(Root, root)

    if (module.hot) {
        // Help React hot module figure out the root component instances on the page.
        const HotLoaderInjection = require('react-hot-loader/Injection')

        HotLoaderInjection.RootInstanceProvider.injectProvider({
            getRootInstances: () => [app]
        })
    }

    // helper: app.go('/about')
    app.go = (path) => {
        store.dispatch(push(path))
    }

    debug('app')('render')

    return app
}

export default _createApp
