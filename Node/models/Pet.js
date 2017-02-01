/**
 * Created by XYSM on 2017/2/1.
 */

const db = require('../db');

module.exports = db.defineModel('pets', {
    ownerId: db.ID,
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
});