const CommentRoutes = require('express').Router();
const CommentServices = require('../services/comments');
const moment = require('moment');

CommentRoutes.post('/create', (req, res) => {
    const {
        member_id,
        post_id,
        caption,
    } = req.body
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    CommentServices.create(member_id, post_id, caption, date_created)
        .then(_ => {
            res.status(200).json({
                message: `success, comment created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create comment, try again`,
                error: err,

            });
        });
});

CommentRoutes.get('/:comment_id', (req, res) => {
    const {
        comment_id
    } = req.params;
    CommentServices.read(comment_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate comment`,
                error: err,

            });
        })
});

CommentRoutes.put('/update/:comment_id', (req, res) => {
    // all fields must be passed in
    const {
        member_id,
        post_id,
        caption,
    } = req.body
    const {
        comment_id
    } = req.params;
    const date_updated = moment().format('YYYY-MM-DD hh:mm:ss');
    CommentServices.update(comment_id, member_id, post_id, caption, date_updated)
        .then(_ => {
            res.status(200).json({
                message: `success, comment updated`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to update post, try again`,
                error: err,

            });
        });
});

CommentRoutes.delete('/:comment_id', (req, res) => {
    const {
        comment_id
    } = req.params;
    CommentServices.deleteComment(comment_id)
        .then(stat => {
            res.status(200).json({
                message: `Post ${comment_id} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete post, try again`,
                error: err,

            });
        });
});

CommentRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Comment not found'
    });
});

module.exports = {CommentRoutes,};