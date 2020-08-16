// 3rd party modules
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const { response } = require('express');
// core modules
const path = require('path');
// custom modules
const rootPath = require('./utils/rootPath');
const connectDB = require('./config/connectDB');
const usersRoutes = require('./routes/users');

dotenv.config({
    path: path.join(rootPath, 'config', 'config.env'),
});

const app = express();

connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (request, response) => response.send('App is rinnung'));

app.use('/api/v1/users', usersRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Server is running on the PORT: ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (error, promise) => {
    console.log(`server crashed: ${error.message}`.red.bold);
    server.close(() => {
        process.exit();
    });
});
