'use strict'
import { expect } from 'chai'
import { renderIntoDocument } from 'react-addons-test-utils'

import createApp from '../../../src/js/utils/createApp'
import createStore from '../../../src/js/utils/createStore'
import createHistory from '../../../src/js/utils/createHistory'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import routes from '../../../src/js/routes'

describe('createApp', () => {
    // NOTE: DOM required - skip for faster unit tests
    if (/unit/.test(process.env.TEST_ENV)) return

    it('should create app instance', () => {
        let reducer = combineReducers({routing: routerReducer})
        let store = createStore(reducer)
        let history = createHistory(store)
        let render = renderIntoDocument
        let app = createApp(store, history, routes, render)

        expect(app).to.exist
    })
})
