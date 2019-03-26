const {
    db,
} = require('./db');

const create = (member_id, post_id, date_created, price, caption, image) => {
    return db.none(`INSERT INTO items (member_id, post_id, date_created, price, caption, image)
        VALUES ($[member_id], $[post_id], $[date_created], $[price], $[caption], $[image]);`, {
        member_id,
        post_id,
        date_created,
        price,
        caption,
        image,
    });
};


const read = (id) => {
    return db.one(`SELECT * FROM items 
    WHERE items.id = $[id];`, {
        id,
    });
};


const update = (id, member_id, date_updated, caption, price, image) => {
    if (!member_id && !caption && !date_updated) {
        console.log('UPDATE POST INFO FAILED @ Nothing to update')
        return new Promise((resolve, reject) => {
            reject(new Error('Nothing to update'));
        });
    };
    const newValueArr = [member_id, date_updated, caption, price, image];
    const keyNameArr = ['member_id', 'date_updated', 'caption', 'price', 'image'];
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
    return db.none(`UPDATE items SET ${addKey}
    WHERE items.id = $[id];`, obj);
};

const deleteItem = (id) => {
    return db.result(`
    DELETE FROM items WHERE items.id = $[id];`, {id});
}


module.exports = {
    create,
    read,
    update,
    deleteItem
};