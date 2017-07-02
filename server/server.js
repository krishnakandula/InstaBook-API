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

/**
 * GET a book with an id
 * Returns the book's author, title, and page
 */
app.get('/books/:id', (req, res) => {
    let id = req.params.id;
    if(!id) {
        return res.status(404).send('No book id was recieved');
    }

    Book.findById(id).then(book => {
        if(!book){
            //Book with that ID doesn't exist
            return res.status(404).send(`A book with id = ${id} does not exist`);
        }

        let bookText = _.pick(book, ['author', 'title', 'page']);
        res.status(200).send(bookText);
    
    }).catch(err => {
        //Invalid ID, send back 'bad request'
        res.status(400).send();
    });
});

/**
 * GET a book cover with a book id
 * Returns the book's cover
 */
app.get('/books/cover/:id', (req, res) => {
    let id = req.params.id;
    if(!id) {
        return res.status(404).send('No book id was recieved');
    }

    Book.findById(id).then(book => {
        if(!book){
            //Book with that ID doesn't exist
            return res.status(404).send(`A book with id = ${id} does not exist`);
        }
        
        res.status(200).send(book.cover.data);
    
    }).catch(err => {
        //Invalid ID, send back 'bad request'
        res.status(400).send();
    });
});

/**
 * GET an array of random books
 */
app.get('/books', (req, res) => {
    let reqCount = parseInt(req.query.count) || 10;
    if(Number.isNaN(reqCount) || reqCount < 1) {
        res.status(400).send('Invalid count. Please provide an integer greater than 0');
        return;
    }

    bookUtils.getRandomBooks(Book, reqCount, (err, randomBooks) => {
        if(err) {
            res.status(404).send('Unable to retrieve random books');
        }

        res.status(200).send(randomBooks);
    });
});

//Delete a book
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    Book.findByIdAndRemove(id).then(book => {
        if(!book) {
            return res.status(404).send(`Could not find Book with id = ${id}`);
        }
        
        res.status(200).send({
            'message': `Book with id = ${id} was deleted`,
            book
        });
    }, err => {
            console.error(err);
            return res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});