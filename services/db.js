const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost/silkroad')

module.exports = {db,}