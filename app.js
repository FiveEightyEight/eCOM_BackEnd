const app = require('express')();
const {MemberRoutes,} = require('./routes/member');
const {PostRoutes,} = require('./routes/posts');
const {CommentRoutes,} = require('./routes/comments');

app.use('/members', MemberRoutes);
app.use('/posts', PostRoutes);
app.use('/comments', CommentRoutes);

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'page not found'
    });
});

module.exports = {app,}; 