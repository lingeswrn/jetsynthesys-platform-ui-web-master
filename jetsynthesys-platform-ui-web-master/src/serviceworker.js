'use strict'

// DOCS:
//      - Service Worker Demos: https://github.com/w3c-webmob/ServiceWorkersDemos
//      - Service Worker Cookbook 1: https://serviceworke.rs
//      - Service Worker Cookbook 2: https://jakearchibald.com/2014/offline-cookbook/

// NOTE: For now have to be ES5 - ES6 not supported because of WebPack/Hot issue assuming `document` present.

// BUG: `debug` don't work in Service Workers or Web Workers (https://github.com/visionmedia/debug/pull/241)
// import debug from 'debug'
// window.localStorage.debug = 'app*'

// debug('app service-worker')('REGISTERED')
console.info('app service-worker', 'REGISTERED', '<%- hash %>')

var assetsVersion = '<%- hash %>'
var assetsKey = `assets-${assetsVersion}`
var assets = [
    '/',

    <% for (var i = 0; i < assets.length; i++) { %>
    '/<%- assets[i].name %>',
    <% } %>

    // NOTE: The meta <link> assets are loaded before service worker is registered, i.e. won't work offline currently.
]

var dataVersion = '<%- hash %>'
var dataKey = `data-${dataVersion}`

this.addEventListener('install', function (event) {
    console.info('app service-worker', 'ON', event.type)

    event.waitUntil(
        caches
            .open(assetsKey)
            .then(function (cache) {
                cache.addAll(assets)
            })
            .catch(function (err) {
                console.error('app service-worker', 'ERROR', event.type, err)
            })
    )
})

this.addEventListener('activate', function (event) {
    console.info('app service-worker', 'ON', event.type)

    // Cleanup old
    // event.waitUntil(
    //     caches.keys()
    //         .then(function (keys) {
    //             return Promise.all(keys
    //                 .filter(function (key) {
    //                     return !key.includes(assetsKey)
    //                 })
    //                 .map(function (key) {
    //                     console.info('app service-worker', 'ON', event.type, 'Deleting out of cache:', key)
    //                     return caches.delete(key)
    //                 })
    //             )
    //         })
    //         .catch(function (err) {
    //             console.error('app service-worker', 'ERROR', event.type, err)
    //         })
    // )
})

this.addEventListener('installing', function (event) {
    console.info('app service-worker', 'ON', event.type)
})

this.addEventListener('activating', function (event) {
    console.info('app service-worker', 'ON', event.type)
})

this.addEventListener('activated', function (event) {
    console.info('app service-worker', 'ON', event.type)
})

this.addEventListener('redundant', function (event) {
    console.warn('app service-worker', 'ON', event.type)
})

this.addEventListener('fetch', function (event) {
    var request = event.request.clone()

    // Always perform remote request
    // return event.respondWith(fetch(event.request))

    // Skip WebSocket-related requests
    if (request.url.includes('sock')) {
        return event.respondWith(fetch(request))
    }

    console.info('app service-worker', 'ON', event.type, event.request.url)

    event.respondWith(
        caches
            .match(request)
            .then(function (response) {
                if (response) {
                    console.info('app service-worker', 'LOCAL / CACHE HIT', request.url)

                    return response
                } else {
                    console.info('app service-worker', 'LOCAL / CACHE MISS', request.url)

                    return new Error('Not Found')
                }
            })
            .catch(function (err) {
                // Not in local cache -> Perform remote fetch
                return fetch(request)
                    .then(function (response) {
                        if (!response || response.status >= 400 || response.type !== 'basic') {
                            return response
                        }

                        caches
                            .open(dataKey)
                            .then(function(cache) {
                                console.info('app service-worker', 'REMOTE / FETCH -> CACHE', request.url)

                                cache.put(request, response.clone())
                            })

                        return response
                    })
            })
            // .catch(function (err) {
            //     console.error('app service-worker', 'REMOTE / ERROR', request.url)

            //     // Error/Offline: Fallback response
            //     return new Response(`503`, {
            //         status: 503,
            //         statusText: 'Service Unavailable',
            //     })
            // })
    )
})
