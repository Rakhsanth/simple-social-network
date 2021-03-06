// 3rd party modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// custom modules
const ErrorResponse = require('../utils/errorWrapper');
const User = require('../models/User');

/*
desc : Check if the token is acuthenticated and set the current user
route: any protected route with this midlleware plugged in
access: private (user)
*/
const protectRoute = async (request, response, next) => {
    let token;
    console.log(request.headers.authorization);
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')
    ) {
        token = request.headers.authorization.split(' ')[1];
    } else if (request.cookies.token) {
        token = request.cookies.token;
    }
    console.log(`${token}`.green.inverse);
    if (!token) {
        return next(
            new ErrorResponse('not authorized to access this route', 404)
        );
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        console.log(decoded);
        request.user = await User.findById(decoded.id);

        if (!request.user) {
            return next(
                new ErrorResponse('not authorized to access this route', 401)
            );
        }

        next();
    } catch (err) {
        console.log(err);
        return next(
            new ErrorResponse('not authorized to access this route', 401)
        );
    }
};

module.exports = {
    protectRoute,
};
