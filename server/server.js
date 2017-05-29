/**
 * Created by Krishna Chaitanya Kandula on 5/29/17.
 */

require('./config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');

let app = express();
const port = process.env.PORT;

//middleware
app.use(bodyParser.json());

//Create new book
app.post('/books', (req, res) => {
    console.log(req.body.poop);
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});