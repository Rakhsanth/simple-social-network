// 3rd part modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    facebookUser: Boolean,
    name: {
        type: String,
        required: [true, 'name is required for an user'],
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'email is not of correct format',
        ],
    },
    password: {
        type: String,
        select: false,
    },
    resetPassword: String,
    resetPasswordExpire: Date,
    avatar: String,
    facebookId: String,
    createdDate: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.path('email').required(function () {
    return !this.facebookUser;
}, 'email is required for native login');
UserSchema.path('password').required(function () {
    return !this.facebookUser;
}, 'Password is required');
UserSchema.path('facebookId').required(function () {
    return this.facebookUser;
}, 'facebook id is required for facebook users');

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE,
    });
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
