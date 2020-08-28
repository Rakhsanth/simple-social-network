// 3rd party modules
const express = require('express');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const axios = require('axios');
// core modules
const ErrorResponse = require('../utils/errorWrapper');
// custom modules
const User = require('../models/User');
const Profile = require('../models/Profile');
const asyncHandler = require('../middlewares/asyncHandler');

/*
@ description : Get current logged in user details
@ route : GET api/v1/profiles/me
@ access : private (user)
*/
const getCurrentUserProfile = asyncHandler(async (request, response, next) => {
    // if (!request.user) {
    //     return next(new ErrorResponse(`not authorized to use this route`, 404));
    // }
    const user = request.user;
    console.log(user);
    const profile = await Profile.findOne({ user: user.id }).populate({
        path: 'user',
        select: 'name',
    });

    if (!profile) {
        return next(
            new ErrorResponse(
                `Current user does not have a profile created`,
                404
            )
        );
    }

    response.status(200).json({
        success: true,
        data: profile,
        error: false,
    });
});
/*
@ description : Create a new profile
@ route : POST api/v1/profiles
@ access : private (user)
*/
const createProfile = asyncHandler(async (request, response, next) => {
    const { skills, status } = request.body;
    let errors = [];
    if (!skills || validator.isEmpty(skills)) {
        errors.push({ skills: 'skills is mandatory' });
    }
    if (!status || validator.isEmpty(status)) {
        errors.push({ skills: 'status is mandatory' });
    }
    if (errors.length !== 0) {
        console.log(errors);
        errors = JSON.stringify(errors);
        return next(new ErrorResponse(errors.toString(), 401));
    }
    request.body.skills = skills.split(',').map((skill) => skill.trim());
    if (await Profile.findOne({ user: request.user.id })) {
        return next(
            new ErrorResponse(
                'Cannot create new profile as it already exists, try updating instead.',
                401
            )
        );
    }

    request.body.user = request.user.id;
    const profile = await Profile.create(request.body);

    response.status(201).json({
        success: true,
        data: profile,
        error: false,
    });
});
/*
@ description : Update profile details
@ route : PUT api/v1/profiles
@ access : private (user)
*/
const updateProfile = asyncHandler(async (request, response, next) => {
    const { skills, status, overwrite } = request.body;
    let errors = [];
    if (!skills || validator.isEmpty(skills)) {
        errors.push({ skills: 'skills is mandatory' });
    }
    if (!status || validator.isEmpty(status)) {
        errors.push({ skills: 'status is mandatory' });
    }
    if (errors.length !== 0) {
        console.log(errors);
        errors = JSON.stringify(errors);
        return next(new ErrorResponse(errors.toString(), 401));
    }
    request.body.skills = skills.split(',').map((skill) => skill.trim());
    let profile = await Profile.findOne({ user: request.user.id });
    if (!profile) {
        return next(
            new ErrorResponse(
                `Cannot update as current user does not have a profile created`,
                404
            )
        );
    }
    request.body.user = request.user.id;
    profile = await Profile.findOneAndUpdate(
        { user: request.user.id },
        request.body,
        {
            new: true,
            runValidators: true,
            overwrite: overwrite,
        }
    );

    response.status(201).json({
        success: true,
        data: profile,
        error: false,
    });
});
/*
@ description : Get all profiles
@ route : GET api/v1/profiles
@ access : public
*/
const getAllProfiles = asyncHandler(async (request, response, next) => {
    response.status(200).json(response.advancedResults);
});
/*
@ description : Get profile by user id
@ route : GET api/v1/profiles/users/:id
@ access : public
*/
const getProfileByUserId = asyncHandler(async (request, response, next) => {
    const profile = await Profile.findOne({ user: request.params.id }).populate(
        {
            path: 'user',
            select: 'name',
        }
    );

    if (!profile) {
        return next(new ErrorResponse('No matching profile found', 404));
    }

    response.status(200).json({
        success: true,
        data: profile,
        error: false,
    });
});
/*
@ description : Delete user along with their profile and posts
@ route : DELETE api/v1/profiles/users/:id
@ access : private
*/
const deleteUserAndProfile = asyncHandler(async (request, response, next) => {
    const user = await User.findById(request.params.id);
    if (!user) {
        return next(new ErrorResponse('User do not exists', 401));
    }
    const profile = await Profile.findOne({ user: request.params.id });
    if (!profile) {
        return next(new ErrorResponse('Profile do not exists', 401));
    }

    await Profile.findOneAndDelete({ user: request.params.id });
    await User.findByIdAndDelete(request.params.id);

    response.status(200).json({
        success: true,
        data: null,
    });
});
/*
@ description : Get github repositories of a user
@ route : DELETE api/v1/profiles/github/:username
@ access : public
*/
const getGithubRepos = asyncHandler(async (request, response, next) => {
    const { username } = request.params;
    const config = {
        method: 'get',
        url: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
        headers: {
            'user-agent': 'node.js',
            Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
    };

    const githubRepos = await axios(config);

    // console.log(githubRepos);

    response.status(200).json({
        success: true,
        count: githubRepos.data.length,
        data: githubRepos.data,
        error: false,
    });
});

module.exports = {
    getCurrentUserProfile,
    createProfile,
    updateProfile,
    getAllProfiles,
    getProfileByUserId,
    deleteUserAndProfile,
    getGithubRepos,
};
