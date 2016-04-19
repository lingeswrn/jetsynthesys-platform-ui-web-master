'use strict'
import debug from 'debug'
import uuid from 'uuid'

// NOTE: reference implementation, for cause testing `Redux`

const CartItem = (state = {}, action) => {

    // debug('app Cart.Reducer')('CartItem', {state, action})

    let quantity = undefined

    switch (action.type) {

        case 'ADD_CART_ITEM':
            return {
                type: 'CartItem',
                id: action.id || uuid.v4(),
                product: action.payload,
                quantity: 1,
            }

        case 'INCREASE_CART_ITEM':
            quantity = state.quantity + (action.payload.quantity || 1)

            return {
                ...state,
                quantity: quantity,
            }

        case 'DECREASE_CART_ITEM':
            quantity = state.quantity - (action.payload.quantity || 1)
            if (quantity < 0) quantity = 0

            return {
                ...state,
                quantity: quantity,
            }

        default:
            return state
    }

}

const CartItems = (state = [], action) => {

    // debug('app Cart.Reducer')('CartItems', {state, action})

    switch (action.type) {

        case 'CLEAR_CART_ITEMS':
            return []

        case 'REMOVE_CART_ITEM':
            // NOTE: assuming `payload` is array index - could be product ID later
            return [
                ...state.items.slice(0, action.payload),
                ...state.items.slice(action.payload + 1)
            ]

        case 'ADD_CART_ITEM':
            return [
                ...state,
                CartItem(undefined, action)
            ]

        case 'INCREASE_CART_ITEM':
        case 'DECREASE_CART_ITEM':
            return state
                .map(o => o.id === action.payload.id ? CartItem(o, action) : o)

        default:
            return state
    }

}

export default CartItems
