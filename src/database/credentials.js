const devURI = 'mongodb://127.0.0.1:27017/study-island?retryWrites=true&w=majority';

const prodURI = process.env.MONGODB_URI;


module.exports = {
    mongo: {
        development: {
            connectionString: devURI
        },
        production: {
            connectionString: prodURI
        }
    }
}