// 3rd party modules
const express = require('express');
const validator = require('validator');
// core modules
const ErrorResponse = require('../utils/errorWrapper');
// custom modules
const User = require('../models/User');
const Profile = require('../models/Profile');
const asyncHandler = require('../middlewares/asyncHandler');
const Post = require('../models/Post');

/*
@ description : Create a new post
@ route : POST api/v1/posts
@ access : private (user)
*/
const createPost = asyncHandler(async (request, response, next) => {
    const { text } = request.body;
    let errors = [];
    if (!text || validator.isEmpty(text)) {
        errors.push({ text: 'post text is required' });
    }
    if (errors.length !== 0) {
        return next(new ErrorResponse(JSON.stringify(errors), 404));
    }

    const user = await User.findById(request.user.id);

    request.body.user = user.id;
    request.body.name = user.name;

    const post = await Post.create(request.body);

    response.status(201).json({
        success: true,
        data: post,
        error: false,
    });
});
/*
@ description : Get all posts
@ route : GET api/v1/posts
@ access : private
*/
const getAllPosts = asyncHandler(async (request, response, next) => {
    response.status(200).json(response.advancedResults);
});
/*
@ description : Get a post by Id
@ route : GET api/v1/posts/:id
@ access : private
*/
const getPost = asyncHandler(async (request, response, next) => {
    const post = await Post.findById(request.params.id);
    if (!post) {
        return next(new ErrorResponse('Post does not exists', 404));
    }

    response.status(201).json({
        success: true,
        data: post,
        error: false,
    });
});
/*
@ description : Delete a post by Id
@ route : DELETE api/v1/posts/:id
@ access : private (user who owns the post)
*/
const deletePost = asyncHandler(async (request, response, next) => {
    const post = await Post.findById(request.params.id);
    if (!post) {
        return next(new ErrorResponse('Post does not exists', 404));
    }
    if (post.user.toString() !== request.user.id) {
        return next(
            new ErrorResponse('current user cannot delete this post', 404)
        );
    }

    await Post.findByIdAndDelete(request.params.id);

    response.status(201).json({
        success: true,
        data: null,
    });
});
/*
@ description : Like and unlike a post
@ route : PUT api/v1/posts/likes/:id
@ access : private
*/
const likeUnlikePost = asyncHandler(async (request, response, next) => {
    const post = await Post.findById(request.params.id);
    if (!post) {
        return next(new ErrorResponse('Post does not exists', 404));
    }

    const alreadyLiked = post.likes.filter(
        (like) => like.user.toString() === request.user.id
    );

    if (alreadyLiked.length === 1) {
        // If it is already liked
        const listOfUsers = post.likes.map((like) => like.user.toString());
        const indexToRemove = listOfUsers.indexOf(request.user.id);
        post.likes.splice(indexToRemove, 1);
    } else {
        // If not yet liked
        post.likes.unshift({ user: request.user.id });
    }

    await post.save();

    response.status(201).json({
        success: true,
        data: post.likes,
        error: false,
    });
});
/*
@ description : Add comment to a post
@ route : POST api/v1/posts/comment/:id
@ access : private
*/
const addComment = asyncHandler(async (request, response, next) => {
    const post = await Post.findById(request.params.id);
    if (!post) {
        return next(new ErrorResponse('Post does not exists', 404));
    }
    const { text } = request.body;
    const errors = [];
    if (!text || validator.isEmpty(text)) {
        errors.push({ text: 'comment text is required' });
    }
    if (errors.length !== 0) {
        return next(new ErrorResponse(JSON.stringify(errors), 404));
    }

    const user = await User.findById(request.user.id);

    const comment = {
        user: request.user.id,
        text,
        name: user.name,
    };

    post.comments.unshift(comment);

    await post.save();

    response.status(201).json({
        success: true,
        data: post.comments,
        error: false,
    });
});
/*
@ description : Delete the comment
@ route : DELETE api/v1/posts/comment/:id/:commentId
@ access : private (user who created the comment)
*/
const deleteComment = asyncHandler(async (request, response, next) => {
    const post = await Post.findById(request.params.id);
    if (!post) {
        return next(new ErrorResponse('Post does not exists', 404));
    }

    const commentToDelete = post.comments.find(
        (comment) => comment.id.toString() === request.params.commentId
    );
    if (!commentToDelete) {
        return next(new ErrorResponse('Comment does not exists', 404));
    }

    if (commentToDelete.user.toString() !== request.user.id) {
        return next(
            new ErrorResponse(
                'Current user is not authorized to delete this comment',
                401
            )
        );
    }

    post.comments = post.comments.filter(
        (comment) => comment.id !== commentToDelete.id
    );

    await post.save();

    response.status(201).json({
        success: true,
        data: post.comments,
        error: false,
    });
});

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    likeUnlikePost,
    addComment,
    deleteComment,
};
