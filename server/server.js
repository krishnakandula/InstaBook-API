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
const bookUtils = require('./utils/book-utils');

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
        page: req.body.page,
        _id: `${req.body.title}${req.body.author}`
    });

    if(req.file){
        //Save image
        book.cover.data = req.file.buffer;
        book.cover.contentType = 'image/png';
    }

    book.save().then(doc => {
        if(!doc.cover.data && req.file){
            console.log('Image not saved');
        }
        res.send(`${doc.title} by ${doc.author} was successfully saved.`);
    }, err => {
        res.status(400).send(err);
    });
});

//Get a book
app.get('/books/:id/:image', (req, res) => {
    let id = req.params.id;

    Book.findById(id).then(book => {
        if(!book){
            //Book with that ID doesn't exist
            res.status(404).send();
        }
        if(req.params.image.toUpperCase() === 'TRUE'){
            
            //Return image
            res.status(200).send(_.pick(book, ['cover']));
        } else {
            let bookText = _.pick(book, ['author', 'title', 'page']);
            res.status(200).send(bookText);
        }
    }).catch(err => {
        //Invalid ID, send back 'bad request'
        res.status(400).send();
    });
});

//Get some random books
app.get('/books/:count', (req, res) => {
    let reqCount = parseInt(req.params.count);
    if(Number.isNaN(reqCount) || reqCount < 1) {
        res.status(400).send('Invalid count. Please provide an integer greater than 0');
        return;
    }

    Book.count({}, (err, count) => {
        if(err) {
            //TODO: Add a more detailed error message
            res.status(404).send();
            return;
        }

        reqCount = Math.min(count, reqCount);
        bookUtils.getRandomBooks(Book, reqCount, (err, randomBooks) => {
            if(err) {
                res.status(404).send('Unable to retrieve random books');
            }

            res.status(200).send(randomBooks);
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});