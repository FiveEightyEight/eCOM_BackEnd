const request = require('supertest');
const {app,} = require('../app');

test('when making GET request to "/comments/", we get back {message: Comment not found}', done => {
    request(app)
        .get('/comments/')
        .then(response => {
            expect(response.body).toEqual({message: 'Comment not found'})
            done()
        });
});