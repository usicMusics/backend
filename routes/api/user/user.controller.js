const User = require('../../../models/user')

/* 
    GET /api/user/list
*/

const createResponse = (status, message) => ({
  status: status,
  message: message
});

exports.list = (req, res) => {
    // refuse if not an admin
    if (!req.decoded.admin) {
        return res.status(403).json({
            message: '당신은 관리자가 아닙니다'
        })
    }

    User.find({})
        .then(
            users => {
                res.json({
                    status: 200,
                    users
                })
            }
        )
}

exports.userDelete = (req, res) => {
  console.log(req.params.id)
  User.findByIdAndRemove(req.params.id).exec().then(
    user => {
      if (!user) throw new execption('not found');
      res.json(createResponse(204, 'success'))
    }
  ).catch(e => res.json(createResponse(404, 'not found')))
};

/*
    관리자 할당
    POST /api/user/assign-admin/:username
*/
exports.assignAdmin = (req, res) => {
    // refuse if not an admin
    if (!req.decoded.admin) {
        return res.status(403).json({
            message: '당신은 관리자가 아닙니다'
        })
    }
    User.findOneByUsername(req.params.username)
        .then(
            user => {
                if (!user) throw new exception('찾을 수 없음')
                if (user.admin) {
                    user.admin = false
                    user.save()
                    res.json({
                      message: '관리자 취소'
                    })
                } else {
                    user.admin = 'true'
                    user.save()
                    res.json({
                        status: 200,
                        message: '관리자를 할당했습니다'
                    })
                }
            }
        ).catch(e => res.json({ status: 404, message: '회원을 찾을 수 없습니다.' }))
}