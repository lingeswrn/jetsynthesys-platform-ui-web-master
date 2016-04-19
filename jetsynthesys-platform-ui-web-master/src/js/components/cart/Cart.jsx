'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { createAction } from 'redux-actions'
import { connect } from 'react-redux'

// mixins
import ComponentMixin from '../../mixins/Component.Mixin'

// debug
import ObjectInspector from 'react-object-inspector'

// components
import CartItems from './CartItems'

if (process.env.BROWSER) require('../../../css/components/cart/Cart.styl')

class Cart extends Component {

    static propTypes = {
        ...ComponentMixin.propTypes,

        // TODO: validate arrayOf `CartItem` model
        items: PropTypes.arrayOf(PropTypes.object),

        dispatch: PropTypes.func.isRequired,
        onClearCartItems: PropTypes.func.isRequired,
    };

    static defaultProps = {
        items: []
    };

    render () {
        const props = this.props
        const className = ComponentMixin.className(props, 'Cart')

        return (
            <div className={className}>
                <div className="header">
                    <div>Cart</div>
                </div>

                <div className="content">
                    <CartItems items={props.items} />

                    <div className="summary">
                        {props.items.length} items
                    </div>

                    <div className="actions">
                        <button onClick={e => this.onClearCartItems()}>Clear</button>
                    </div>
                </div>
            </div>
        )
    }

    onClearCartItems = (product) => {
        debug('app Cart')('onClearCartItems', arguments)

        if (this.props.onClearCartItems) this.props.onClearCartItems()
    };

}

// redux
Cart = connect(
    state => ({
        items: state.cartItems
    }),
    dispatch => ({
        dispatch,
        onClearCartItems: () => dispatch(createAction('CLEAR_CART_ITEMS')())
    })
)(Cart)

export default Cart
