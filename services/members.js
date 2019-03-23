const {db,} = require('./db');

const create = (username, email, password, date_created) => {    
    return db.none(`INSERT INTO members (username, email, password, date_created)
        VALUES ($[username], $[email], $[password], $[date_created]);`, {
        username,
        email,
        password,
        date_created,
    });
}


/*
id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    date_created TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    token VARCHAR
*/

module.exports = {
    create,
}