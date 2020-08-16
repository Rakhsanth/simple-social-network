// 3rd party modules
const express = require('express');

const app = express();

app.get('/', (request, response) => response.send('App is rinnung'));

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => console.log(`Server is running on the PORT: ${PORT}`));
