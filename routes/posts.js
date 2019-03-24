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
    .then( _ => {
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

PostRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Post not found'
    });
});

module.exports = {PostRoutes,};