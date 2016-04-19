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
import CartItem from './CartItem'

if (process.env.BROWSER) require('../../../css/components/cart/CartItems.styl')

class CartItems extends Component {

    static propTypes = {
        ...ComponentMixin.propTypes,

        // TODO: validate instanceOf `CartItems` model
        items: PropTypes.arrayOf(PropTypes.object),

        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        items: []
    };

    render () {
        const props = this.props
        const className = ComponentMixin.className(props, 'CartItems')

        return (
            <div className={className}>
                <div className="header">
                </div>

                <div className="content">
                    {
                        props.items.map((item, i) => (
                            <CartItem key={i} item={item} />
                        ))
                    }
                </div>
            </div>
        )
    }

}

// redux
CartItems = connect(
    state => ({
        ...state
    }),
    dispatch => ({
        dispatch,
    })
)(CartItems)

export default CartItems
