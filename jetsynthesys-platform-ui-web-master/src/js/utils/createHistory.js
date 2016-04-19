'use strict'
import debug from 'debug'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const _createHistory = (store) => {
    let history = syncHistoryWithStore(browserHistory, store)

    history.listen(location => debug('app router')(location.pathname))

    debug('app history')('create')

    return history
}

export default _createHistory
