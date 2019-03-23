const request = require('supertest');
const {app,} = require('../app');

// test('Entering an invalide email should return "{error: email not valid}"', done => {
//     request(app)
//         .post('/members/')
//         .then(response => {
//             expect(response.body).toEqual({error: 'email not valid'})
//             done()
//         });
// });

test('when making GET request to "/members/", we get back {message: Member page not found}', done => {
    request(app)
        .get('/members/')
        .then(response => {
            expect(response.body).toEqual({message: 'Member page not found'})
            done()
        });
});