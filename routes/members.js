const MemberServices = require('../services/members');
const { ItemRoutes, } = require('./items');
const { LikeRoutes, } = require('./likes');
const { FollowRoutes, } = require('./follows');
const moment = require('moment');
const validator = require('validator');

const MemberRoutes = require('express').Router();

MemberRoutes.use('/items', ItemRoutes);
MemberRoutes.use('/likes', LikeRoutes);
MemberRoutes.use('/followers', FollowRoutes);

MemberRoutes.post('/create', (req, res) => {
    const {
        username,
        email,
        password,
        uid
    } = req.body
    if (!validator.isEmail(email)) res.status(400).json({
        error: 'email not valid'
    });
    // needs username & password validation
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    MemberServices.create(username, email, password, uid, date_created)
        .then(data => {
            res.status(200).json({
                data,
                message: `success, ${username} created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create member, try again`,
                error: err,

            });
        });
});

MemberRoutes.get('/uid', (req, res) => {
    const {
        uid
    } = req.query;
    MemberServices.readByUid(uid)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate member`,
                error: err,

            });
        })
});

MemberRoutes.get('/:id', (req, res, next) => {
    const {
        id
    } = req.params;
    if (!id.match(/[0-9]/g)) next();
    MemberServices.readById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate member`,
                error: err,

            });
        })
});

MemberRoutes.get('/:member_username', (req, res) => {
    const {
        member_username
    } = req.params;
    MemberServices.read(member_username)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate member`,
                error: err,

            });
        })
});

MemberRoutes.put('/login', (req, res) => {
    const {
        uid
    } = req.query;
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    MemberServices.login(uid, date_created)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate member`,
                error: err,

            });
        })

})

MemberRoutes.put('/update', (req, res) => {
    // all fields must be passed in
    const {
        id,
        username,
        email,
        password
    } = req.body
    if (!validator.isEmail(email)) res.status(400).json({
        error: 'email not valid'
    });
    MemberServices.update(id, username, email, password)
        .then(_ => {
            res.status(200).json({
                message: `success, ${username} updated`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to update member, try again`,
                error: err,

            });
        });
});

MemberRoutes.delete('/:member_username', (req, res) => {
    const {
        member_username
    } = req.params;
    MemberServices.deleteMember(member_username)
        .then(stat => {
            res.status(200).json({
                message: `${member_username} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete member, try again`,
                error: err,

            });
        });
});

MemberRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Member page not found'
    });
});

module.exports = {
    MemberRoutes,
};