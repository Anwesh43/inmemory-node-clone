const express = require('express')
const inmemoryDb = require('./memdb')
const app = express()

app.put('/put/:key/:value', (req, res) => {
    const {key, value} = req.params
    inmemoryDb.set(key, value)
    res.setHeader("Content-Security-Policy", "default-src 'self'")
    res.json({status : "success"})
})

app.get('/get/:key', (req, res) => {
    const {key} = req.params
    res.setHeader("Content-Security-Policy", "default-src 'self'")
    res.json({data : {result : inmemoryDb.get(key)}})
})

app.listen(8000, () => {
    console.log("started listening on 8000")
})
