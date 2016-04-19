'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { createAction } from 'redux-actions'
import { connect } from 'react-redux'

// mixins
import ComponentMixin from '../../mixins/Component.Mixin'

// debug
import ObjectInspector from 'react-object-inspector'

if (process.env.BROWSER) require('../../../css/components/product/Product.styl')

class Product extends Component {

    static propTypes = {
        ...ComponentMixin.propTypes,

        // TODO: validate instanceOf `Product` model
        product: PropTypes.object,

        dispatch: PropTypes.func.isRequired,
        onAddToCart: PropTypes.func.isRequired,
    };

    render () {
        const props = this.props
        const className = ComponentMixin.className(props, 'Product')

        return (
            <div className={className}>
                <div className="data">
                    <ObjectInspector className="data" data={ props.product } />
                </div>

                <button onClick={e => this.onAddCartItem(props.product)}>Buy</button>
            </div>
        )
    }

    onAddCartItem = (product, quantity = 1) => {
        debug('app Product')('onAddCartItem', arguments)

        if (this.props.onAddToCart) this.props.onAddToCart(product, quantity)
    };

}

// redux
Product = connect(
    state => ({
        ...state
    }),
    dispatch => ({
        dispatch,
        onAddToCart: (product, quantity) => dispatch(createAction('ADD_CART_ITEM')(product, {quantity})),
    }),
)(Product)

export default Product
