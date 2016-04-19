'use static'

let endpoint = `localhost:${process.env.PORT}`

if (process.env.SSL) {
    endpoint = `localhost:${process.env.PORT_HTTPS}`
}

export default {
    endpoint: endpoint
}
