// module require
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const history = require('connect-history-api-fallback')
// const synth = require('synth-js')
// const fs = require('fs')
const cors = require('cors')
const path = require('path')

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || 5000

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()

// CORS SETTING
app.use(cors())

/* =======================
    SETTING ENGINE
==========================*/

app.use(express.static(path.join(__dirname, 'public')))
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

app.use(function (req, res, next) {
    //모든 도메인의 요청을 허용하지 않으면 웹브라우저에서 CORS 에러를 발생시킨다.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
})

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// configure api router
app.use('/api', require('./routes/api'))

// start server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('connected to mongodb server')
})