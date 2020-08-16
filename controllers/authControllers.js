// 3rd party modules
const express = require('express');
const validator = require('validator');
// core modules
const ErrorResponse = require('../utils/errorWrapper');

const isValidPassword = (password) => {
    if (password.length < 7) return false;
    if (password.search(/[a-z]/i) === -1) return false;
    if (password.search(/[A-Z]/i) === -1) return false;
    if (password.search(/[0-9]/i) === -1) return false;
    if (password.search(/\W/i) === -1) return false;
    return true;
};

/*
@ description : register a user with email and password
@ route : POST api/v1/auth/register
@ access : public
*/
const registerUser = async (request, response, next) => {
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
        console.log(errors);
        errors = JSON.stringify(errors);
        return next(new ErrorResponse(errors.toString(), 401));
    }
    console.log(request.body);
    response.status(201).json({
        success: true,
        message: 'user registered successfully',
        error: false,
    });
};

module.exports = {
    registerUser,
};
