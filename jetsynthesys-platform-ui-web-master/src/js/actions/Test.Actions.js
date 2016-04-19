'use strict'
import { createAction } from 'redux-actions'
import fetch from 'isomorphic-fetch'
import axios from 'axios'

// config
import config from '../config'

// constants
import * as types from '../constants/ActionTypes'

class TestActions {

    static syncExampleAction = (data) => {
        const payload = data
        return createAction(types.SYNC_EXAMPLE_ACTION)(payload)
    };

    static asyncPromiseExampleAction = (data) => {
        return (dispatch) => {
            const payload = Promise.resolve(data || {foo: 'bar'})
            return createAction(types.ASYNC_PROMISE_EXAMPLE_ACTION)(payload)
        }
    };

    static asyncPromiseNotifyExampleAction = (data) => {
        return (dispatch) => {
            const payload = new Promise((resolve, reject) => {
                dispatch(createAction(types.DEBUG_EXAMPLE_ACTION)({message: 'Loading data...', params: data || {foo: 'bar'}}))
                resolve(data)
            })
            return createAction(types.ASYNC_PROMISE_NOTIFY_EXAMPLE_ACTION)(payload)
        }
    };

    // payload is a `Promise` - see `redux-promise`
    static asyncPromiseFetchExampleAction = (data, url) => {
        return (dispatch) => {
            // ALT 1: using `axios`
            const payload = axios.get(url || `http://${config.endpoint}/assets/_test/index.json`, {params: data || {foo: 'bar'}})

            // ALT 2: using `fetch`
            // const payload = new Promise((resolve, reject) => {
            //     fetch(`http://${config.endpoint}/assets/_test/index.json`)
            //         .then(res => res.json())
            //         .then(data => resolve(data))
            //         .catch(err => reject(err))
            // })


            // ALT 3: using external interface (not implemented)
            // const payload = API.fetchPromiseExample

            return createAction(types.ASYNC_PROMISE_FETCH_EXAMPLE_ACTION)(payload)
        }
    };

}

export default TestActions
