const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let bookSchema = new mongoose.Schema({
    _id: {
        type: String
    },
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
    page: {
        type: String,
        require: true,
        minlength: 10,
        trim: true
    },
    information: {
        type: String,
        required: false,
        trim: true
    },
    summary: {
        type: String,
        required: false,
        trim: true
    },
    cover: {
        data: Buffer,
        contentType: String
    },
    background: {
        data: Buffer,
        contentType: String
    }
});

bookSchema.plugin(mongoosePaginate);
let Book = mongoose.model('Book', bookSchema);

module.exports = {
    Book
};