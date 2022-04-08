const mongoose = require('mongoose');
var credentials = require('./credentials');

let dbURI = "Dev DB";
if (process.env.MONGODB_URI) { // Use Remote DB
    dbURI = credentials.mongo.production.connectionString;

    // Mongoose connection options
    let options = { useUnifiedTopology: true, useNewUrlParser: true };

    mongoose.connect(dbURI, options);

} else { // Use Local DB
    const { dbConnect, dbDisconnect } = require('../../utils/test-utils/dbHandler.utils');
    dbConnect();
}

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});