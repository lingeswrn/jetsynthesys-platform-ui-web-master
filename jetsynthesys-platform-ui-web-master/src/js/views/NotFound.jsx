'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { createAction } from 'redux-actions'

// containers
import View from '../containers/View'

class NotFound extends Component {

    render () {
        const props = this.props

        return (
            <View id="NotFound">
                <h1>404: not found</h1>
            </View>
        )
    }
}

export default NotFound
