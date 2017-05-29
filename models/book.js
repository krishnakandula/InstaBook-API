const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
    }
});

let Book = mongoose.model('Book', bookSchema);

module.exports = {
    Book
};