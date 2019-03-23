const {db,} = require('./db');

const create = (username, email, password, date_created) => {    
    return db.none(`INSERT INTO members (username, email, password, date_created)
        VALUES ($[username], $[email], $[password], $[date_created]);`, {
        username,
        email,
        password,
        date_created,
    });
};


const read = (email) => {
    return db.one(`SELECT * FROM members 
    WHERE email = $[email];`, {
        email,
    });
};

const readToken = (token) => {
    return db.one(`SELECT * FROM members 
    WHERE token = $[token];`, {
        token
    });
};

const update = (id, username, email, password) => {

};


module.exports = {
    create,
};