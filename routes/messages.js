const MessageRoutes = require('express').Router();
const MessageServices = require('../services/messages');
const moment = require('moment');

MessageRoutes.post('/create', (req, res) => {
    const {
        author_id, 
        recipient_id,
        message,
    } = req.body
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    MessageServices.create(author_id, recipient_id, message, date_created)
        .then(_ => {
            res.status(200).json({
                message: `success, message created`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to create message, try again`,
                error: err,

            });
        });

});

MessageRoutes.get('/:message_id', (req, res) => {
    const {
        message_id
    } = req.params;
    MessageServices.read(message_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate message`,
                error: err,

            });
        })
});

MessageRoutes.put('/update/:message_id', (req, res) => {
    // all fields must be passed in
    const {
        author_id, 
        recipient_id,
        message,
    } = req.body
    const {
        message_id
    } = req.params;
    const date_updated = moment().format('YYYY-MM-DD hh:mm:ss');
    MessageServices.update(message_id, author_id, recipient_id, message, date_updated)
        .then(_ => {
            res.status(200).json({
                message: `success, Message updated`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to update message, try again`,
                error: err,

            });
        });
});

MessageRoutes.delete('/:message_id', (req, res) => {
    const {
        message_id
    } = req.params;
    MessageServices.deleteMessage(message_id)
        .then(stat => {
            res.status(200).json({
                message: `Message ${message_id} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete message, try again`,
                error: err,

            });
        });
});

MessageRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Message not found'
    });
});

module.exports = {
    MessageRoutes,
};