const request = require('supertest');
const {app,} = require('../app');

test('when making GET request to "/", we get back {message: home}', done => {
    request(app)
        .get('/')
        .then(response => {
            expect(response.body).toEqual({message: 'home'})
            done()
        });
});

test('when making a GET request to a route that does NOT exist, we get back {message: page not found}', done => {
    request(app)
    .get('/rdm/rdm/rdm/rdm')
    .then(response => {
        expect(response.body).toEqual({message: 'page not found'})
        done()
    })
});

test('when making a POST request to a route that does NOT exist, we get back {message: page not found}', done => {
    request(app)
    .post('/rdm/rdm/rdm/rdm')
    .then(response => {
        expect(response.body).toEqual({message: 'page not found'})
        done()
    })
});

test('when making a PUT request to a route that does NOT exist, we get back {message: page not found}', done => {
    request(app)
    .put('/rdm/rdm/rdm/rdm')
    .then(response => {
        expect(response.body).toEqual({message: 'page not found'})
        done()
    })
});

test('when making a DELETE request to a route that does NOT exist, we get back {message: page not found}', done => {
    request(app)
    .delete('/rdm/rdm/rdm/rdm')
    .then(response => {
        expect(response.body).toEqual({message: 'page not found'})
        done()
    })
});