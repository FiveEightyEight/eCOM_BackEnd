const request = require('supertest');
const {app,} = require('../app');

test('when making GET request to "/members/", we get back {message: Post not found}', done => {
    request(app)
        .get('/posts/')
        .then(response => {
            expect(response.body).toEqual({message: 'Post not found'})
            done()
        });
});