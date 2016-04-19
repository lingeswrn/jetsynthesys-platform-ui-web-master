'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'

class App extends Component {

    render () {
        const props = this.props

        return (
            <div id="App">
                {props.children}
            </div>
        )
    }
}

export default App
