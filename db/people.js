let db = require('./dbClient');
let {INTEGER, STRING} = require('sequelize');

let People = db.define('people', {
    peopleId: {type: INTEGER, field: 'people_id', primaryKey: true, autoIncrement: true},
    firstName: {type: STRING(50), allowNull: false},
    lastName: {type: STRING(50), allowNull: false},
    publicIdentifier: {type: STRING(50), allowNull: false},
    occupation: {type: STRING(200), allowNull: false},
}, {
    comment: '人脉表',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    indexes: [{fields: ['firstName']}]
});

// //node db/people
// People.sync();

module.exports = People;