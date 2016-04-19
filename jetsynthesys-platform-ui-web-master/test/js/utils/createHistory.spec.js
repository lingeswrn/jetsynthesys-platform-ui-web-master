'use strict'

import { expect } from 'chai'

import createHistory from '../../../src/js/utils/createHistory'
import createStore from '../../../src/js/utils/createStore'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

describe('createHistory', () => {
    // NOTE: DOM required - skip for faster unit tests
    if (/unit/.test(process.env.TEST_ENV)) return

    it('should create history instance', () => {
        let reducer = combineReducers({routing: routerReducer})
        let store = createStore(reducer)
        let history = createHistory(store)

        expect(history).to.exist
    })
})
