const router = require('express').Router()
const controller = require('./board.controller')

// 게시판 읽기
router.get('', controller.readBoards) // 모든 게시판
router.get('/:id', controller.readBoard) // 특정 게시판

// 게시판 추가
router.post('', controller.createBoard)

// 게시판 수정
router.put('/:id', controller.updateBoard)

// 게시판 삭제
router.delete('/:id', controller.deleteBoard)


/*
    댓글
*/

// 댓글 작성
router.post('/:id/comment', controller.createComment)

// 댓글 삭제
router.delete('/:id/comment/:c_id', controller.deleteComment)

module.exports = router