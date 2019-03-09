const MemberRoutes = require('express').Router();

MemberRoutes.use('/', (req, res) => {
    res.status(404).json({
        message: 'Member page not found'
    });
});

module.exports = MemberRoutes;