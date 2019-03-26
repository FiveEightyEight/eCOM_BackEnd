const LikeRoutes = require('express').Router();
const LikeServices = require('../services/likes');
const moment = require('moment');

LikeRoutes.post('/create', (req, res) => {
    const {
        member_id,
        post_id,
    } = req.body
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    LikeServices.create(member_id, post_id, date_created)
        .then(_ => {
            res.status(200).json({
                message: `success, like created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create like, try again`,
                error: err,

            });
        });

});

LikeRoutes.get('/post/:post_id', (req, res) => {
    const {
        post_id
    } = req.params;
    LikeServices.getCount(post_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate like`,
                error: err,

            });
        })
});

LikeRoutes.get('/:like_id', (req, res) => {
    const {
        like_id
    } = req.params;
    LikeServices.read(like_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate like`,
                error: err,

            });
        })
});


LikeRoutes.delete('/:like_id', (req, res) => {
    const {
        like_id
    } = req.params;
    LikeServices.deleteLike(like_id)
        .then(stat => {
            res.status(200).json({
                message: `Like ${like_id} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete like, try again`,
                error: err,

            });
        });
});

LikeRoutes.use('/', (req, res) => {
    res.status(200).json({
        message: 'All likes'
    });
});

LikeRoutes.use((req, res) => {
    res.status(404).json({
        message: 'Post not found'
    });
});

module.exports = {
    LikeRoutes,
};