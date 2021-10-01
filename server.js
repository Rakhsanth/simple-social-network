// 3rd party modules
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
// core modules
const path = require('path');
// custom modules
const rootPath = require('./utils/rootPath');
const connectDB = require('./config/connectDB');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const profilesRoutes = require('./routes/profiles');
const postRoutes = require('./routes/posts');
const paymentRoutes = require('./routes/payments');
const mongoErrorHandler = require('./middlewares/mongoErrorHandler');

dotenv.config({
    path: path.join(rootPath, 'config', 'config.env'),
});

const app = express();

connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cookieParser());

app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
            'https://simple-social-network-288007.el.r.appspot.com',
        ],
    })
); // To make passing and receiving cookies

app.use(fileUpload());

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profiles', profilesRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.use(mongoErrorHandler);

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (request, response) => {
        response.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
}

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
