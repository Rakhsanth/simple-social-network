//3rd party modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// core modules
const path = require('path');
// custom modules
const rootPath = require('../utils/rootPath');

dotenv.config({
    path: path.join(rootPath, 'config', 'config.env'),
});

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDb connected successfully'.cyan.underline);
};

module.exports = connectDB;
