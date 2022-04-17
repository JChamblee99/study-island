const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sampleData = require('../../src/database/sample')

var mongoServer;

exports.dbConnect = async () => {

    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    await mongoose.connect(uri, mongooseOpts);

    await sampleData.build();
};

exports.dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
        await mongoServer.stop();
    }
};