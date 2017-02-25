let db = require('./dbClient');
let {INTEGER, STRING, BOOLEAN, DATE} = require('sequelize');

let People = db.define('people', {
    peopleID: {type: INTEGER, primaryKey: true, autoIncrement: true},
    source: {type: INTEGER, allowNull: false, comment: '数据来源'},
    cname: {type: STRING(50), comment: '中文名'},
    ename: {type: STRING(50), comment: '英文名'},
    keyword: {type: STRING(20), comment: '关键字'},
    linkedInID: {type: STRING(50), comment: '领英标识'},
    industry: {type: STRING(50), comment: '行业'},
    company: {type: STRING(200), comment: '公司'},
    bu: {type: STRING(50), comment: '事业部'},
    function: {type: STRING(50), comment: '职能'},
    title: {type: STRING(200), comment: '职位'},
    location: {type: STRING(100), comment: '地域'},
    gender: {type: BOOLEAN, comment: '性别'},
    yob: {type: INTEGER, comment: '出生年'},
    edu: {type: INTEGER, comment: '学历'},
    college: {type: STRING(50), comment: '毕业院校'},
    email: {type: STRING(50), comment: '邮箱'},
    mobile: {type: STRING(15), comment: '手机'},
    tel: {type: STRING(15), comment: '座机'},
    ftf: {type: BOOLEAN, comment: '是否已经面谈'},
    ftfTime: {type: DATE, comment: '面谈时间'},
    package: {type: INTEGER, comment: '年薪(K)'},
    packageDetail: {type: STRING(100), comment: '年薪构成'},
    strength: {type: STRING(100), comment: '优势'},
    comment: {type: STRING, comment: '点评'},
    notes: {type: STRING(100), comment: '备注'},
}, {
    comment: '人脉表',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    indexes: [{fields: ['ename', 'cname']}]
});

// //node db/people
// People.sync();

// //in mysql chinese word has length 1
// People.create({
//     source: 1,
//     cname: '测试长度哈测试长度哈测试长度哈测试长度哈测试长度哈'
// });

module.exports = People;