let db = require('./dbClient');
let {INTEGER, STRING, BOOLEAN} = require('sequelize');

let Criteria = db.define('criteria', {
    criteriaID: {type: INTEGER, primaryKey: true, autoIncrement: true},
    keyword: {type: STRING(20), allowNull: false, comment: '关键字'},
    industry: {type: STRING(20), allowNull: false, comment: '行业'},
    location: {type: STRING(20), allowNull: false, comment: '地域'},
    url: {type: STRING(500), allowNull: false, comment: '领英地址'},
    executed: {type: BOOLEAN, allowNull: false, comment: '是否已经执行'}
}, {
    comment: '爬虫条件表',
    freezeTableName: true,
    timestamps: true,
    underscored: true
});

// //node db/criteria
// Criteria.sync();

module.exports = Criteria;