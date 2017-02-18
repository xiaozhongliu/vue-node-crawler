const {user, pwd} = require('./account.json');

module.exports = {

    DEBUG: false,

    // app
    APP_DOMAIN: 'www.flashbeep.cn',
    APP_PORT: 80,

    // api port
    API_PORT: 3100,

    MYSQL: {
        host: 'localhost',
        name: 'linkedin',
        user,
        pwd,
    },
};