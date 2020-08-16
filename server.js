// 3rd party modules
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan());
}

app.get('/', (request, response) => response.send('App is rinnung'));

const PORT = process.env.PORT || 4010;

app.listen(PORT, () =>
    console.log(`Server is running on the PORT: ${PORT}`.yellow.bold)
);
