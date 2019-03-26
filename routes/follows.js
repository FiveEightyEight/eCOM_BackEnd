const FollowRoutes = require('express').Router();
const FollowServices = require('../services/follows');
const moment = require('moment');

FollowRoutes.post('/create', (req, res) => {
    const {
        follower_id,
        followed_id,
    } = req.body;
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    FollowServices.create(follower_id, followed_id, date_created)
        .then(_ => {
            res.status(200).json({
                message: `success, follow created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create follow, try again`,
                error: err,

            });
        });

});

FollowRoutes.get('/id', (req, res) => {
    const {
        follower_id, 
        followed_id
    } = req.query;
    FollowServices.getFollowId(follower_id, followed_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('error: ', err)
            res.status(400).json({
                message: `Could not locate follow`,
                error: err,

            });
        })
});

FollowRoutes.get('/count/:followed_id', (req, res) => {
    const {
        followed_id
    } = req.params;
    FollowServices.read(followed_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate follow`,
                error: err,

            });
        })
});

FollowRoutes.get('/:followed_id', (req, res) => {
    const {
        followed_id
    } = req.params;
    FollowServices.getFollowers(followed_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate follow`,
                error: err,

            });
        })
});

FollowRoutes.delete('/:follow_id', (req, res) => {
    const {
        follow_id
    } = req.params;
    FollowServices.deleteFollower(follow_id)
        .then(stat => {
            res.status(200).json({
                message: `Follow ${follow_id} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete follow, try again`,
                error: err,

            });
        });
});

FollowRoutes.use('/', (req, res) => {
    res.status(200).json({
        message: 'Follows home'
    });
});

FollowRoutes.use((req, res) => {
    res.status(404).json({
        message: 'Post not found'
    });
});

module.exports = {
    FollowRoutes,
};