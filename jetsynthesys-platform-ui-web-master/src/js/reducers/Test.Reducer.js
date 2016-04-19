'use strict'
import debug from 'debug'
import uuid from 'uuid'

// constants
import * as types from '../constants/ActionTypes'

const Test = (state = [], action) => {

    debug('app Test.Reducer')('Test', {state, action})

    switch (action.type) {

        case types.SYNC_EXAMPLE_ACTION:
            return {
                data: action.payload,
            }

        case types.ASYNC_PROMISE_EXAMPLE_ACTION:
            return {
                data: action.payload.data,
            }

        case types.ASYNC_PROMISE_FETCH_EXAMPLE_ACTION:
            return {
                data: action.payload.data,
            }

        // case types.ASYNC_PROMISE_EXAMPLE_ACTION_PENDING:
        // case types.ASYNC_PROMISE_EXAMPLE_ACTION_FULFILLED:
        // case types.ASYNC_PROMISE_EXAMPLE_ACTION_REJECTED:

        // case types.ASYNC_PROMISE_NOTIFY_EXAMPLE_ACTION_PENDING:
        // case types.ASYNC_PROMISE_NOTIFY_EXAMPLE_ACTION_FULFILLED:
        // case types.ASYNC_PROMISE_NOTIFY_EXAMPLE_ACTION_REJECTED:

        // case types.ASYNC_PROMISE_FETCH_EXAMPLE_ACTION_PENDING:
        // case types.ASYNC_PROMISE_FETCH_EXAMPLE_ACTION_FULFILLED:
        // case types.ASYNC_PROMISE_FETCH_EXAMPLE_ACTION_REJECTED:

        default:
            return state
    }
}

export default Test
