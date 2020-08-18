// 3rd party modules
const express = require('express');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// core modules
const ErrorResponse = require('../utils/errorWrapper');
// custom modules
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const { isValidPassword } = require('../utils/requestValidators');

/*
@ description : register a user with email and password
@ route : POST api/v1/auth/register
@ access : public
*/
const registerUser = asyncHandler(async (request, response, next) => {
    const { name, email, password } = request.body;
    let errors = [];
    if (!name || validator.isEmpty(name)) {
        errors.push({ name: 'name is required' });
    }
    if (!email || !validator.isEmail(email)) {
        errors.push({ email: 'not a valid email' });
    }
    if (!password || !isValidPassword(password)) {
        errors.push({ password: 'password criteria not matched' });
    }
    if (errors.length !== 0) {
        // console.log(errors);
        return next(new ErrorResponse(JSON.stringify(errors), 401));
    }
    console.log(request.body);

    let user = await User.findOne({ email });

    if (user) {
        return next(
            new ErrorResponse(`User with email: ${email} already exists`, 401)
        );
    }

    // avatar url to be implemented later

    user = await User.create({
        name,
        email,
        password,
    });

    setTokenToCookie(user, 201, response, 'registered successfully');
});
/*
@ description : login a user with email and password
@ route : POST api/v1/auth/login
@ access : public
*/
const loginUser = asyncHandler(async (request, response, next) => {
    const { email, password } = request.body;
    let errors = [];
    if (!email || !validator.isEmail(email)) {
        errors.push({ email: 'not a valid email' });
    }
    if (!password || !isValidPassword(password)) {
        errors.push({ password: 'password criteria not matched' });
    }
    if (errors.length !== 0) {
        // console.log(errors);
        return next(new ErrorResponse(JSON.stringify(errors), 401));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(
            new ErrorResponse(
                `No user registered with the email: ${email}`,
                401
            )
        );
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return next(new ErrorResponse(`incorrect password`, 401));
    }
    setTokenToCookie(user, 200, response, 'log in success');
});
/*
@ description : Get current logged in user details
@ route : GET api/v1/auth/me
@ access : private (user)
*/
const getCurrentUser = asyncHandler(async (request, response, next) => {
    if (!request.user) {
        return next(new ErrorResponse(`not authorized to use this route`, 404));
    }

    const user = await User.findById(request.user.id);

    if (!user) {
        return next(new ErrorResponse(`no such user exists`, 404));
    }

    response.status(200).json({
        success: true,
        data: user,
        error: false,
    });
});

const setTokenToCookie = (user, statusCode, response, message) => {
    const token = user.getSignedJwtToken();
    const options = {
        // As cookie expire is given in milliseconds we get a number in env and convert to day here.
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // This is to anable only the client side script to access this cookie
        secure: false,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    console.log(options);
    response.status(statusCode).cookie('token', token, options).json({
        success: true,
        message,
        token,
    });
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
