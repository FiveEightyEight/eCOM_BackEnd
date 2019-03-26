const {
    db,
} = require('./db');

const create = (follower_id, followed_id, date_created) => {
    return db.one(`INSERT INTO follows (follower_id, followed_id, date_created)
        VALUES ($[follower_id], $[followed_id], $[date_created])
        RETURNING id;`, {
        follower_id,
        followed_id,
        date_created,
    });
};

const read = (id) => {
    return db.one(`SELECT * FROM follows 
    WHERE follows.id = $[id];`, {
        id,
    });
};

const getFollowId = (follower_id, followed_id) => {
    return db.one(`SELECT id FROM follows 
    WHERE follows.follower_id = $[follower_id] AND follows.followed_id = $[followed_id];`, {
        follower_id,
        followed_id,
    });
};

const getCount = (followed_id) => {
    return db.one(`SELECT COUNT(*) FROM follows 
    WHERE follows.followed_id = $[followed_id];`, {
        followed_id,
    });
}

const getFollowers = (followed_id) => {
    return db.any(`SELECT follower_id FROM follows 
    WHERE follows.followed_id = $[followed_id];`, {
        followed_id,
    });
}

const deleteFollower = (id) => {
    return db.result(`
    DELETE FROM follows WHERE follows.id = $[id];`, {
        id
    });
}


module.exports = {
    create,
    read,
    getFollowId,
    getCount,
    getFollowers,
    deleteFollower
};