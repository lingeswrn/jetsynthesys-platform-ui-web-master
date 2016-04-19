'use strict'
import { expect } from 'chai'

import createStore from '../../../src/js/utils/createStore'

import { combineReducers } from 'redux'

describe('createStore', () => {
    it('should create (redux) store instance', () => {
        let store = createStore()

        expect(store).to.exist
    })
})
