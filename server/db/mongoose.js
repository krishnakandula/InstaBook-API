const mongoose = require('mongoose');

//Use our own promise library. Mongoose's is deprecated.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};