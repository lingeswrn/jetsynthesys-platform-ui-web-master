'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import fetch from 'isomorphic-fetch'

// utils
import fetchComponentData from '../utils/fetchComponentData'

// containers
import View from '../containers/View'

// components
import Cart from '../components/cart/Cart'
import Products from '../components/product/Products'

// actions
import TestActions from '../actions/Test.Actions'

class Home extends Component {

    static propTypes = {
        // test: PropTypes.object.isRequired
        dispatch: PropTypes.func.isRequired
    };

    static contextTypes = {
        store: React.PropTypes.object,
    };

    static needs = [
        // example: server pre-fetching
        TestActions.asyncPromiseFetchExampleAction,
    ];

    componentDidMount () {
        const { store } = this.context

        if (process.env.BROWSER) {
            fetchComponentData(store.dispatch, [Home], this.params)
        }
    }

    render () {
        const props = this.props

        const products = [
            {
                type: 'Product',
                id: '1',
                name: "Product A",
                price: 99,
                currecy: 'USD',
            },
            {
                type: 'Product',
                id: '2',
                name: "Product B",
                price: 149,
                currecy: 'USD',
            }
        ]

        return (
            <View id="Home">
                <h1>Home</h1>

                <Products products={products} />

                <Cart />
            </View>
        )
    }
}

// redux
Home = connect(
    state => ({
        ...state
    }),
    dispatch => ({
        dispatch
        // ...
    }),
)(Home)

export default Home
