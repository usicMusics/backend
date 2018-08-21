const mongoose = require('mongoose')
const Music = require('../../../models/music')
const formidable = require('formidable')
const fs = require('fs')

const createResponse = (status, message) => ({
  status: status,
  message: message
})

// 게시판 리스트
exports.readMusics = (req, res) => {
  // 최근 글부터 출력
  console.log('12')
  Music.find({}).sort({date:-1}).exec()
    .then(
      music => {
        res.json({ music })
      }
    ).catch(error => {
      res.json({error})
    })
};

// 음악생성
exports.createMusic = (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    const oldMusic = files.music.path
    const newMusic = './public/music/' + files.music.name
    fs.rename(oldMusic, newMusic, function (err) {
      if (err) throw err
    })

    console.log(files.cover.name)
    let cover = 'cover.jpg'
    if(files.cover.name !== '') {
      const oldCover = files.cover.path
      const newCover = './public/cover/' + files.cover.name
      cover = files.cover.name

      fs.rename(oldCover, newCover, function (err) {
        if (err) throw err
      })
    }

    let lrc = 'lrc.lrc'
    if(files.lrc.name !== '') {
      const oldLrc = files.lrc.path
      const newLrc = './public/cover/' + files.lrc.name
      lrc = files.lrc.name

      fs.rename(oldLrc, newLrc, function (err) {
        if (err) throw err
      })
    }
    
    // console.log(req.body.title)
    const create = () => {
      return Music.create(fields.title, fields.artist, cover, files.music.name, true, lrc)
    }
    const respond = () => {
      res.json(createResponse(200, '성공'))
    }
    create().then(respond)
  })
};

exports.uploadSource = (req, res) => {
  let form = new formidable.IncomingForm()
  console.log(form)
  form.parse(req, function (err, fields, files) {
    const oldMusic = files.music.path
    const newMusic = './public/music/' + files.music.name
    fs.rename(oldMusic, newMusic, function (err) {
      if (err) throw err
    })

    let cover = 'cover.jpg'
    let lrc = 'lrc.lrc'
    
    // console.log(req.body.title)
    const create = () => {
      return Music.create(fields.title, fields.artist, cover, files.music.name, false, lrc)
    }
    const respond = () => {
      res.json(createResponse(200, '성공'))
    }
    create().then(respond)
  })
};

// 음악 삭제
exports.remove = (req, res) => {
  const fs = require('fs')

  Music.findByIdAndRemove({ _id: req.params.id }).exec().then(
    music => {
      if (!music) throw new execption('not found')
      const filename = music.music
      music.save()
      fs.unlinkSync(`./public/music/${filename}`)
      res.json(createResponse(204, 'success'))
    }
  ).catch(e => res.json(createResponse(404, 'not found')))
  
}

// 음악 소스 등록
exports.createSource = (req, res) => {
  let lrc = 'lrc.lrc'
  let cover = 'cover.jpg'
  
  const {title, artist, pattern} = req.body
  // res.json({success: true})

  const synth = require('synth-js')
  const fs = require('fs')
  var scribble = require('scribbletune')
  var clip = scribble.clip({
    notes: 'F#m C#m DM Bm EM AM DM C#m AM',
    // pattern: 'x_x_x_--'.repeat(8),
    pattern: pattern.repeat(8),
    sizzle: true
  })

  scribble.midi(clip, `./public/music/${title}.mid`)
  
  let midiBuffer = fs.readFileSync(`./public/music/${title}.mid`)
  // convert midi buffer to wav buffer
  let wavBuffer = synth.midiToWav(midiBuffer).toBuffer()

  fs.writeFileSync(`./public/music/${title}.wav`, wavBuffer, {encoding: 'binary'});
  const create = () => {
    return Music.create(title, artist, cover, title + '.wav', false, lrc)
  }
  const respond = () => {
    res.json(createResponse(200, '성공'))
  }
  create().then(respond)
}

// 좋아요
exports.rate = (req, res) => {
  const id = req.params.id
  console.log(id)
  const username = req.body.username
  console.log(username)
  Music.findById({_id: id}).exec().then(
    music => {
      // music.rate.unshift({username})
      console.log(music)
      music.rate.unshift({username})
      music.save()
      console.log(music)
      res.json(createResponse(200, '성공'))
    }
  ).catch(e => res.json(createResponse(404, 'not found')))
}

// 좋아요 취소
exports.removeRate = (req, res) => {
  const id = req.params.id
  const username = req.params.username
  console.log(username)
  Music.findById({_id: id}).exec().then(
    music => {
      console.log(music.rate)
      var a = music.rate.find(function (element) {
        return element.username == req.params.username
      })
      if(a === undefined) new error('1')
      var index = music.rate.indexOf(a)
      console.log("index:" + index)
      console.log("value:" + a)
      music.rate.splice(index, 1)
      music.save()
      console.log(music.rate)
      res.json(createResponse(204, '좋아요 취소'))
    }
  ).catch(error => {
    res.json({error: error})
  })
}