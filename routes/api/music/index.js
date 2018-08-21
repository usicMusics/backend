const router = require('express').Router()
const controller = require('./music.controller')

// 음악리스트
router.get('', controller.readMusics) // 모든 게시판

// 음악 등록
router.post('', controller.createMusic)

// 음악 삭제
router.delete('/:id', controller.remove)

// 좋아요
router.post('/:id/rate', controller.rate)
router.delete('/:id/rate/:username', controller.removeRate)

// 음악 소스 생성
router.post('/source', controller.createSource)

// 음악 소스 등록
router.post('/upload', controller.uploadSource)

module.exports = router