'use strict'
import debug from 'debug'
import React from 'react'
import { Route, IndexRoute } from 'react-router'

// layout
import App from './containers/App'

// views
import Home from './views/Home'
import About from './views/About'
import NotFound from './views/NotFound'

// routes
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="about" component={About}/>

        <Route path="*" component={NotFound}/>
    </Route>
)
