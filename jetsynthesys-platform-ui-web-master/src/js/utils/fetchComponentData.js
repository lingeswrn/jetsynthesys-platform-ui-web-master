'use strict'

const _fetchComponentData = (dispatch, components, params) => {
    const needs = components.reduce((prev, current) => {
        return current ? [...(current.needs || []), ...prev] : prev
    }, [])

    const promises = needs.map(need => dispatch(need(params)))

    return Promise.all(promises)
}

export default _fetchComponentData
