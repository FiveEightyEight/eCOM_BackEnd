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


module.exports = {
    create,
}