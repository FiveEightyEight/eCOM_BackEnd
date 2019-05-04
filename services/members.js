const {
    db,
} = require('./db');

const create = (username, email, password, uid, date_created) => {
    return db.one(`INSERT INTO members (uid, username, email, password, date_created)
        VALUES ($[uid], $[username], $[email], $[password], $[date_created]) RETURNING id;`, {
            uid,
            username,
            email,
            password,
            date_created,
        });
};


const read = (username) => {
    return db.one(`SELECT * FROM members 
    WHERE username = $[username];`, {
            username,
        });
};

const readById = (id) => {
    return db.any(`SELECT posts.id AS post_id, * 
    FROM members 
    FULL JOIN posts
    ON members.id = posts.member_id
    WHERE members.id = $[id];`, {
            id,
        });
};

const readByUid = (uid) => {
    return db.one(`SELECT * FROM members 
    WHERE members.uid = $[uid];`, {
            uid,
        });
};

const readToken = (token) => {
    return db.one(`SELECT * FROM members 
    WHERE token = $[token];`, {
            token
        });
};

const login = (uid, date) => {
    return db.one(`UPDATE members SET last_login = $[date]
    WHERE members.uid = $[uid] RETURNING id;`, {uid, date});
} 

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

const deleteMember = (username) => {
    return db.result(`
    DELETE FROM members WHERE members.username = $[username];`, { username });
}


module.exports = {
    create,
    read,
    readById,
    readByUid,
    readToken,
    login,
    update,
    deleteMember
};