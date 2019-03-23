const {
    db,
} = require('./db');

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
    if (!username && !email && !password) {
        console.log('UPDATE MEMBER INFO FAILED @ Nothing to update')
        return new Promise((resolve, reject) => {
            reject(new Error('Nothing to update'));
        });
    };
    const newValueArr = [username, email, password];
    const keyNameArr = ['username', 'email', 'password'];
    let addKey = [];
    const obj = {
        id
    };

    for (let i = 0; i < newValueArr.length; i++) {
        const key = keyNameArr[i];
        const val = newValueArr[i]
        if (!newValueArr[i]) {
            continue;
        } else {
            addKey.push(`${key} = $[${key}]`);
            obj[key] = val;
        }
    };
    addKey = addKey.join(', ');
    // console.log('obj', obj)
    // console.log('addKey: ', addKey)
    return db.none(`UPDATE members SET ${addKey}
    WHERE members.id = $[id];`, obj);
};


module.exports = {
    create,
    read,
    readToken,
    update,
};