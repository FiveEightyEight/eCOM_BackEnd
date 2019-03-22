const request = require('supertest');
const {app,} = require('../app');

test('when making GET request to "/members/", we get back {message: Member page not found}', done => {
    request(app)
        .get('/members/')
        .then(response => {
            expect(response.body).toEqual({message: 'Member page not found'})
            done()
        });
});