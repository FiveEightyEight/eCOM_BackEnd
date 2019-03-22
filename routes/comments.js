const CommentRoutes = require('express').Router();

CommentRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Comment not found'
    });
});

module.exports = {CommentRoutes,};