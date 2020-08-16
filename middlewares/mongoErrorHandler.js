// custom modules
const ErrorResponse = require('../utils/errorWrapper');

const mongoErrorHandler = (err, request, response, next) => {
    let error = { ...err };
    console.log('error is printed now for dev purpose'.red.bold);
    console.log(error);
    error.message = err.message;

    console.log(err.name);
    if (err.name === 'CastError') {
        const message = 'No resource exist for the request';
        error = new ErrorResponse(message, 400);
    }
    if (err.code === 11000) {
        const message = 'Some duplicate value is entered';
        error = new ErrorResponse(message, 400);
    }
    if (err.name === 'ValidationError') {
        // The Object.values(someObject) -> This returns an array of all the values inside this someObjects
        const message = Object.values(error.errors).map(
            (eachError) => eachError.message
        );
        error = new ErrorResponse(message, 400);
    }

    response.status(error.status || 500).json({
        success: false,
        data: JSON.parse(error.message),
        error: true,
    });
};

module.exports = mongoErrorHandler;
