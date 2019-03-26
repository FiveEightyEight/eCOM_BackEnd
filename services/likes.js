const {
    db,
} = require('./db');

const create = (member_id, post_id, date_created) => {
    return db.one(`INSERT INTO likes (member_id, post_id, date_created)
        VALUES ($[member_id], $[post_id], $[date_created])
        RETURNING id;`, {
        member_id,
        post_id,
        date_created,
    });
};

const read = (id) => {
    return db.one(`SELECT * FROM likes 
    WHERE likes.id = $[id];`, {
        id,
    });
};

const getCount = (post_id) => {
    return db.one(`SELECT COUNT(*) FROM likes 
    WHERE likes.post_id = $[post_id];`, {
        post_id,
    });
}

const deleteLike = (id) => {
    return db.result(`
    DELETE FROM likes WHERE likes.id = $[id];`, {id});
}


module.exports = {
    create,
    read,
    getCount,
    deleteLike
};