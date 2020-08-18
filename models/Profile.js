const mongoose = require('mongoose');

// Create Schema
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        // May geoCode later during completion and when doing passport JS related stuff
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        // Comma seperated values and to be rendered logically with JS in react and also while inserting to DB
        type: [String],
        required: true,
    },
    bio: {
        type: String,
    },
    githubUserName: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldofstudy: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);
