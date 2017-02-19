let db = require('./dbClient');
let {INTEGER, STRING, BOOLEAN} = require('sequelize');

let Dict = db.define('dict', {
    dictId: {type: INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: STRING(20), allowNull: false, comment: '类型'},
    key: {type: STRING(20), allowNull: false, comment: '键'},
    value: {type: STRING(50), comment: '值'},
    desc: {type: STRING(50), comment: '描述'},
    hasChild: {type: BOOLEAN, comment: '是否有子节点', defaultValue: false}
}, {
    comment: '字典表',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    indexes: [{fields: ['type']}]
});

// // //node db/dict
// Dict.sync().then(() => {
//     //init data
//     Dict.create({type: 'Root', key: 'Crawler', desc: '爬虫相关', hasChild: true});
//     Dict.create({type: 'Crawler', key: 'Criteria', desc: '筛选条件', hasChild: true});
//     Dict.create({type: 'Criteria', key: 'Location', desc:'所在地区', hasChild: false});
//     Dict.create({type: 'Criteria', key: 'Industry', desc:'行业领域', hasChild: false});
//     Dict.create({type: 'Criteria', key: 'Keyword',desc:'关键词', hasChild: false});
// });

module.exports = Dict;