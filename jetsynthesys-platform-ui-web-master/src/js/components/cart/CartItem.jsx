'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { createAction } from 'redux-actions'
import { connect } from 'react-redux'

// mixins
import ComponentMixin from '../../mixins/Component.Mixin'

// debug
import ObjectInspector from 'react-object-inspector'

if (process.env.BROWSER) require('../../../css/components/cart/CartItem.styl')

class CartItem extends Component {

    static propTypes = {
        ...ComponentMixin.propTypes,

        // TODO: validate instanceOf `CartItem` model
        item: PropTypes.object,

        dispatch: PropTypes.func.isRequired,
        onIncreaseCartItem: PropTypes.func.isRequired,
        onDecreaseCartItem: PropTypes.func.isRequired,
    };

    render () {
        const props = this.props
        const className = ComponentMixin.className(props, 'CartItem')

        return (
            <div className={className}>
                <div className="data">
                    <ObjectInspector className="data" data={ props.item } />
                </div>

                <button onClick={e => this.onIncreaseCartItem(props.item, 1)}>+</button>
                <button onClick={e => this.onDecreaseCartItem(props.item, 1)}>-</button>
            </div>
        )
    }

    onIncreaseCartItem = (item, quantity = 1) => {
        debug('app CartItem')('onIncreaseCartItem', arguments)

        if (this.props.onIncreaseCartItem) this.props.onIncreaseCartItem(item, quantity)
    };

    onDecreaseCartItem = (item, quantity = 1) => {
        debug('app CartItem')('onDecreaseCartItem', arguments)

        if (this.props.onDecreaseCartItem) this.props.onDecreaseCartItem(item, quantity)
    };

}

// redux
CartItem = connect(
    state => ({
        ...state
    }),
    dispatch => ({
        dispatch,
        onIncreaseCartItem: (item, quantity) => dispatch(createAction('INCREASE_CART_ITEM')({id: item.id, quantity})),
        onDecreaseCartItem: (item, quantity) => dispatch(createAction('DECREASE_CART_ITEM')({id: item.id, quantity})),
    })
)(CartItem)

export default CartItem
