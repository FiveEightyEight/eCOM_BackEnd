const PostRoutes = require('express').Router();

PostRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Posts not found'
    });
});

module.exports = PostRoutes;