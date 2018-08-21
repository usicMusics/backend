const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Board = new Schema({
    title: String,
    content: String,
    writer: String,
    date: { type: Date, default: Date.now },
    updated: [{ contents: String, date: { type: Date, default: Date.now } }],
    count: { type: Number, default: 0 },
    comments: [{
        name: String,
        comment: String,
        date: { type: Date, default: Date.now }
    }]
});

Board.statics.create = function (title, content, writer) {
    const board = new this({
        title,
        content,
        writer
    })

    return board.save()
}

Board.statics.comment = function (name, comment) {
    const board = new this({
        comments: [{
            name,
            comment
        }]
    })

    return board.save()
}

module.exports = mongoose.model('Board', Board)