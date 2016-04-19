'use strict'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// reducers
import TestReducers from './Test.Reducer'
import CartReducer from './Cart.Reducer'

const RootReducer = combineReducers({
    test: TestReducers,
    cartItems: CartReducer,
    routing: routerReducer
})

export default RootReducer
