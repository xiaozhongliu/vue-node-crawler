const {user, pwd} = require('./account.json');

module.exports = {

    DEBUG: true,

    // app
    APP_DOMAIN: '127.0.0.1',
    APP_PORT: 3000,

    // api
    API_PORT: 3100,

    MYSQL: {
        host: 'localhost',
        name: 'linkedin',
        user,
        pwd,
    },
};