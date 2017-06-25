const _ = require('lodash');

function getRandomBooks(Book, count, callback) {
    let randomIndex = Math.floor(Math.random() * count);
    getRandomBooksHelper(Book, count - 1, [], randomIndex, callback);
}

function getRandomBooksHelper(Book, count, randomBooks, startIndex, callback) {
    if(count < 0) {
         callback(undefined, _.shuffle(randomBooks));
         return;
    }

    Book.findOne().skip(count + startIndex).exec().then(book => {
        randomBooks.push(getBookText(book));
        getRandomBooksHelper(Book, --count, randomBooks, startIndex, callback);
    }).catch(err => {
        console.error(err);
        callback(err, undefined);
    });
}

let getBookText = book => {
    return _.pick(book, ['author', 'title', 'page']);
};

module.exports = {
    getBookText, 
    getRandomBooks
};