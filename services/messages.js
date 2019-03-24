const {
    db,
} = require('./db');

const create = (author_id, recipient_id, message, date_created) => {
    return db.none(`INSERT INTO messages (author_id, recipient_id, message, date_created)
        VALUES ($[author_id], $[recipient_id], $[message], $[date_created]);`, {
        author_id, 
        recipient_id,
        message,
        date_created,
    });
};


const read = (id) => {
    return db.one(`SELECT * FROM messages 
    WHERE messages.id = $[id];`, {
        id,
    });
};


const update = (id, author_id, recipient_id, message, date_updated) => {
    if (!message && !date_updated) {
        console.log('UPDATE MESSAGE INFO FAILED @ Nothing to update')
        return new Promise((resolve, reject) => {
            reject(new Error('Nothing to update'));
        });
    };
    const newValueArr = [author_id, recipient_id, message, date_updated];
    const keyNameArr = ['author_id', 'recipient_id', 'message', 'date_updated'];
    let addKey = [];
    const obj = {
        id
    };

    for (let i = 0; i < newValueArr.length; i++) {
        const val = newValueArr[i];
        const key = keyNameArr[i];
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
    return db.none(`UPDATE messages SET ${addKey}
    WHERE messages.id = $[id];`, obj);
};

const deleteMessage = (id) => {
    return db.result(`
    DELETE FROM messages WHERE messages.id = $[id];`, {id});
}


module.exports = {
    create,
    read,
    update,
    deleteMessage
};