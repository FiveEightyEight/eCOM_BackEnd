const ItemRoutes = require('express').Router();
const ItemServices = require('../services/items');
const PostServices = require('../services/posts');
const moment = require('moment');

ItemRoutes.post('/create', (req, res) => {
    const {
        member_id,
        price,
        post_caption,
        caption,
        image,
    } = req.body
    const date_created = moment().format('YYYY-MM-DD hh:mm:ss');
    PostServices.create(member_id, post_caption, date_created)
        .then(post_id => {
            return ItemServices.create(member_id, post_id.id, date_created, price, caption, image)
        })
        .then(_ => {
            res.status(200).json({
                message: `success, item created`,
            });
        })
        .catch(err => {
            console.log('error: ', err)
            res.status(400).json({
                message: `unable to create item, try again`,
                error: err,

            });
        });
});

ItemRoutes.get('/:item_id', (req, res) => {
    const {
        item_id
    } = req.params;
    ItemServices.read(item_id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: `Could not locate item`,
                error: err,

            });
        })
});

ItemRoutes.put('/update/:item_id', (req, res) => {
    // all fields must be passed in
    const {
        caption,
        price,
        image,
    } = req.body
    const {
        item_id
    } = req.params;
    const date_updated = moment().format('YYYY-MM-DD hh:mm:ss');
    ItemServices.update(item_id, date_updated, caption, price, image)
        .then(_ => {
            res.status(200).json({
                message: `success, item updated`,
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to update post, try again`,
                error: err,

            });
        });
});

ItemRoutes.delete('/:item_id', (req, res) => {
    const {
        item_id
    } = req.params;
    ItemServices.deleteItem(item_id)
        .then(stat => {
            res.status(200).json({
                message: `Item ${item_id} successfully deleted`
            });
        })
        .catch(err => {
            res.status(400).json({
                message: `unable to delete post, try again`,
                error: err,

            });
        });
});

ItemRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Item not found'
    });
});

module.exports = {
    ItemRoutes,
};