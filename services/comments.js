const {
    db,
} = require('./db');

const create = (member_id, post_id, caption, date_created) => {
    return db.none(`INSERT INTO comments (member_id, post_id, caption, date_created)
        VALUES ($[member_id], $[post_id], $[caption], $[date_created]);`, {
        member_id,
        post_id,
        caption,
        date_created,
    });
};


const read = (id) => {
    return db.one(`SELECT * FROM comments 
    WHERE comments.id = $[id];`, {
        id,
    });
};


const update = (id, member_id, post_id, caption, date_updated) => {
    if (!member_id && !post_id &&!caption && !date_updated) {
        console.log('UPDATE POST INFO FAILED @ Nothing to update')
        return new Promise((resolve, reject) => {
            reject(new Error('Nothing to update'));
        });
    };
    const newValueArr = [member_id, post_id, caption, date_updated];
    const keyNameArr = ['member_id', 'post_id', 'caption', 'date_updated'];
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
    return db.none(`UPDATE comments SET ${addKey}
    WHERE comments.id = $[id];`, obj);
};

const deleteComment = (id) => {
    return db.result(`
    DELETE FROM comments WHERE comments.id = $[id];`, {id});
}


module.exports = {
    create,
    read,
    update,
    deleteComment
};