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

CommentRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Comment not found'
    });
});

module.exports = {CommentRoutes,};