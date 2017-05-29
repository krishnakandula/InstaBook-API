/**
 * Created by Krishna Chaitanya Kandula on 5/29/17.
 */

require('./config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

let {Book} = require('./models/book');

let app = express();
const port = process.env.PORT;

//middleware
app.use(bodyParser.json());

//Create new book
app.post('/books', (req, res) => {
    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text
    });

    book.save().then(doc => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});