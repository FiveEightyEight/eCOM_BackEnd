const ReplyRoutes = require('express').Router();
const ReplyServices = require('../services/replies');
const moment = require('moment');

ReplyRoutes.post('/create', (req, res) => {
    const {
        member_id,
        message_id,
        caption,
    } = req.body
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    ReplyServices.create(member_id, message_id, caption, date_created)
        .then(_ => {
            res.status(200).json({
                message: `success, reply created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create reply, try again`,
                error: err,

            });
        });
});

ReplyRoutes.get('/:reply_id', (req, res) => {
    const {
        reply_id
    } = req.params;
    ReplyServices.read(reply_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate reply`,
                error: err,

            });
        })
});

ReplyRoutes.put('/update/:reply_id', (req, res) => {
    // all fields must be passed in
    const {
        member_id,
        message_id,
        caption,
    } = req.body
    const {
        reply_id
    } = req.params;
    const date_updated = moment().format('YYYY-MM-DD hh:mm:ss');
    ReplyServices.update(reply_id, member_id, message_id, caption, date_updated)
        .then(_ => {
            res.status(200).json({
                message: `success, reply updated`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to update reply, try again`,
                error: err,

            });
        });
});

ReplyRoutes.delete('/:reply_id', (req, res) => {
    const {
        reply_id
    } = req.params;
    ReplyServices.deleteReply(reply_id)
        .then(stat => {
            res.status(200).json({
                message: `Reply ${reply_id} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete reply, try again`,
                error: err,

            });
        });
});

ReplyRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Reply not found'
    });
});

module.exports = {ReplyRoutes,};