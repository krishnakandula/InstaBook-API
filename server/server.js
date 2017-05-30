/**
 * Created by Krishna Chaitanya Kandula on 5/29/17.
 */

require('./config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const multer = require('multer');
const upload = multer.apply({ dest: 'uploads/' });
const fs = require('fs');

let {Book} = require('./models/book');

let app = express();
const port = process.env.PORT;

//middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


//Create new book
app.post('/books', upload.single('file'), (req, res) => {
    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        _id: `${req.body.title}${req.body.author}`
    });

    //Save image
    book.cover.data = req.file.buffer;
    book.cover.contentType = 'image/png';

    book.save().then(doc => {
        if(!doc.cover.data){
            console.log('Image not saved');
        }
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});