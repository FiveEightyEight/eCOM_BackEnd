const MemberServices = require('../services/members');
const moment = require('moment');
const validator = require('validator');

const MemberRoutes = require('express').Router();

MemberRoutes.post('/create', (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    if (!validator.isEmail(email)) res.status(400).json({
        error: 'email not valid'
    });
    // needs username & password validation
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    MemberServices.create(username, email, password, date_created)
        .then(_ => {
            res.status(200).json({
                message: `success, ${username} created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create user, try again`,
                error: err,

            });
        });
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
                message: `unable to update user, try again`,
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