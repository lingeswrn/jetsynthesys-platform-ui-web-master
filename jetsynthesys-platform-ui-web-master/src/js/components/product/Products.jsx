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
import Product from './Product'

if (process.env.BROWSER) require('../../../css/components/product/Products.styl')

class Products extends Component {

    static propTypes = {
        ...ComponentMixin.propTypes,

        // TODO: validate instanceOf `Products` model
        products: PropTypes.arrayOf(PropTypes.object),

        dispatch: PropTypes.func.isRequired,
    };

    render () {
        const props = this.props
        const className = ComponentMixin.className(props, 'Products')

        return (
            <div className={className}>
                <div className="header">
                    <div>Products</div>
                </div>

                <div className="content">
                    {
                        props.products.map((product, i) => (
                            <Product key={i} product={product} />
                        ))
                    }
                </div>
            </div>
        )
    }

}

// redux
Products = connect(
    state => ({
        ...state
    }),
    dispatch => ({
        dispatch,
    })
)(Products)

export default Products
