const mongoose = require('mongoose')
const Board = require('../../../models/board')

const createResponse = (status, message) => ({
  status: status,
  message: message
});

// 게시판 리스트
exports.readBoards = (req, res) => {
  // 최근 글부터 출력
  Board.find({}).sort({date:-1}).exec()
    .then(
      boards => {
        res.json({ boards })
      }
    )
};

// 특정 게시판 읽기
exports.readBoard = (req, res) => {
  // console.log(req.params.id);
  Board.findById(req.params.id).exec().then(
    board => {
      board.count += 1;
      board.save();
      res.json(createResponse(200, board));
    }
  ).catch(e => res.json(createResponse(404, "not found")))
};

/*
  게시글 작성
  
  POST /api/board
  {
    title,
    content,
    writer,
    date
  }
*/
exports.createBoard = (req, res) => {
  const { title, content, writer } = req.body
  console.log(req.body.title)

  const create = () => {
    return Board.create(title, content, writer)
  }
  const respond = () => {
    res.json(createResponse(200, '성공'))
  }
  create().then(respond)
};

// 게시판 수정
exports.updateBoard = (req, res) => {
  Board.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
    .then(
      board => {
        if(req.body.title == '') throw "제목을 입력해주세요"
        if(req.body.content == '') throw "내용을 입력해주세요"
        res.json(createResponse(200, '수정하였습니다'))
      }
    ).catch((e) => {
      res.json({error: e})
      res.status(400)
    })
};

// 게시판 삭제
exports.deleteBoard = (req, res) => {
  Board.findByIdAndRemove(req.params.id).exec().then(
    board => {
      if (!board) throw new execption('not found');
      res.json(createResponse(204, 'success'))
    }
  ).catch(e => res.json(createResponse(404, 'not found')))
};

// 댓글 작성
exports.createComment = (req, res) => {
  const { name, comment } = req.body
  Board.findById({ _id: req.params.id }).exec().then(
    board => {
      console.log(board)
      if (!board) throw new execption("not found");
      // push는 순서대로 unshift 역수 삽입
      board.comments.unshift({ name, comment })
      board.save()
      console.log(board)
      res.json(createResponse(200, '성공'))
    }
  ).catch(e => res.json(createResponse(404, 'not found')))
}

// 댓글 삭제
exports.deleteComment = (req, res) => {
  Board.findById({ _id: req.params.id }).exec().then(
    board => {
      if (!board) throw new execption('not found')
      board.comments.pull({ _id: req.params.c_id })
      board.save()
      res.json(createResponse(204, 'success'))
    }
  ).catch(e => res.json(createResponse(404, 'not found')))
}