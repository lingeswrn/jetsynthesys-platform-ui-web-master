'use strict'
import debug from 'debug'
import React, { Component, PropTypes } from 'react'
import { createAction } from 'redux-actions'
import { connect } from 'react-redux'

// mixins
import ComponentMixin from '../mixins/Component.Mixin'

class View extends Component {

    static propTypes = {
        ...ComponentMixin.propTypes,

        dispatch: PropTypes.func.isRequired,
    };

    render () {
        const props = this.props
        const className = ComponentMixin.className(props, 'View')

        // debug router
        debug('app View')('route', this.props.routing)

        return (
            <div className={className}>
                { props.children }
            </div>
        )
    }

}

// redux
View = connect(
    state => ({
        ...state
    }),
    dispatch => ({
        dispatch,
    })
)(View)

export default View
