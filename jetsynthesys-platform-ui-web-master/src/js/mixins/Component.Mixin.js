'use strict'
import { PropTypes } from 'react'
import classNames from 'classnames'

export default {

    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        as: PropTypes.string,
        visible: PropTypes.bool,
    },

    defaultProps: {
        visible: true,
    },

    className: (props, ...values) => {
        const visible = (typeof props.visible === 'undefined') ? true : props.visible

        return Array.from(new Set(
            classNames(...values, props.className, {hidden: !visible}).split(' ')
        ))
        .join(' ')
    },

    tag: (props, defaultAs = 'div') => {
        return {
            name: props.as || defaultAs
        }
    }

}
