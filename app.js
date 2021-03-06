const app = require('express')();
const bodyParser = require('body-parser')
const cors = require('cors');
const {MemberRoutes,} = require('./routes/members');
const {PostRoutes,} = require('./routes/posts');
const {CommentRoutes,} = require('./routes/comments');
const {MessageRoutes,} = require('./routes/messages');

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors())

app.use('/members', MemberRoutes);
app.use('/posts', PostRoutes);
app.use('/comments', CommentRoutes);
app.use('/messages', MessageRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'home'
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'page not found'
    });
});

module.exports = {app,}; 