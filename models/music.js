const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Musics = new Schema({
    title: String,
    artist: String,
    cover: {type: String, default: 'cover.jpg'},
    music: String,
    isMusic: {type: Boolean, default: true },
    rate: [{
      username: String,
      date: {type: Date, default: Date.now}
    }],
    lrc: {type: String, default: 'lrc.lrc'},
    date: {type: Date, default: Date.now}
});

Musics.statics.create = function(title, artist, cover, music, isMusic, lrc) {
  const musics = new this({
        title,
        artist,
        cover: '/cover/' + cover,
        music: '/music/' + music,
        isMusic,
        lrc: '/lrc/' + lrc
    })

    return musics.save()
}

module.exports = mongoose.model('Musics', Musics);