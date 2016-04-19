'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { createAction } from 'redux-actions'

// containers
import View from '../containers/View'

class About extends Component {

    render () {
        const props = this.props

        return (
            <View id="About">
                <h1>About</h1>
            </View>
        )
    }
}

export default About
