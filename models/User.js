// 3rd part modules
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required for an user'],
    },
    email: {
        type: String,
        required: [true, 'email is required for an user'],
        match: [
            '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
            'email is not of correct format',
        ],
    },
    password: {
        type: String,
        required: [true, 'user must have a password'],
    },
    resetPassword: String,
    resetPasswordExpire: Date,
    avatar: String,
    createdDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model(User, UserSchema);
