const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    text: {
        type: String,
        require: true,
        minlength: 10,
        trim: true
    },
    cover: {
        data: Buffer,
        contentType: String
    }
});

let Book = mongoose.model('Book', bookSchema);

module.exports = {
    Book
};