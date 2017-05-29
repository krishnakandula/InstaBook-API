/**
 * Created by Krishna Chaitanya Kandula on 5/29/17.
 */

const env = process.env.NODE_ENV || 'development';

if(env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/InstaBook';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/InstaBookTest';
}