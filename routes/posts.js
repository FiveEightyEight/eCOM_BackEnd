const PostRoutes = require('express').Router();
const PostServices = require('../services/posts');
const moment = require('moment');

PostRoutes.post('/create', (req, res) => {
    const {
        member_id,
        caption,
    } = req.body
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    PostServices.create(member_id, caption, date_created)
        .then(_ => {
            res.status(200).json({
                message: `success, post created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create post, try again`,
                error: err,

            });
        });

});

PostRoutes.get('/:post_id', (req, res) => {
    const {
        post_id
    } = req.params;
    PostServices.read(post_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate post`,
                error: err,

            });
        })
});

PostRoutes.put('/update/:post_id', (req, res) => {
    // all fields must be passed in
    const {
        member_id,
        caption,
    } = req.body
    const {
        post_id
    } = req.params;
    const date_updated = moment().format('YYYY-MM-DD hh:mm:ss');
    PostServices.update(post_id, member_id, caption, date_updated)
        .then(_ => {
            res.status(200).json({
                message: `success, Post updated`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to update post, try again`,
                error: err,

            });
        });
});

PostRoutes.delete('/:post_id', (req, res) => {
    const {
        post_id
    } = req.params;
    PostServices.deletePost(post_id)
        .then(stat => {
            res.status(200).json({
                message: `Post ${post_id} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete post, try again`,
                error: err,

            });
        });
});

PostRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Post not found'
    });
});

module.exports = {
    PostRoutes,
};