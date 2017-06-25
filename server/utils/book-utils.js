const _ = require('lodash');

function getRandomBooks(Book, count, callback) {
    let randomIndex = count;
    
    Book.count({}).then(totalBooks => {
        count = Math.min(totalBooks, count);
        while(randomIndex + count > totalBooks) {
            randomIndex = Math.floor(Math.random() * count);
        }

        getRandomBooksHelper(Book, count, [], randomIndex - 1, callback);
    }, err => {
        callback(err, undefined);
    });
}

function getRandomBooksHelper(Book, count, randomBooks, startIndex, callback) {
    if(count <= 0) {
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
    return _.pick(book, ['_id', 'author', 'title', 'page']);
};

module.exports = {
    getBookText, 
    getRandomBooks
};