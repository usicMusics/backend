const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const board = require('./board')
const music = require('./music')

router.use('/auth', auth)

router.use('/user', authMiddleware)

router.use('/user', user)

router.use('/board', board)

router.use('/music', music)

module.exports = router