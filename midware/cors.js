const config = require('../config')();

module.exports = (req, res, next) => {

    let clientHost = req.query.clientHost;

    let originUrl = config.APP_PORT == 80 ?
        `http://${clientHost}` :
        `http://${clientHost}:${config.APP_PORT}`;

    res.header('Access-Control-Allow-Origin', originUrl);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'token,ts,Content-Type');
    next()
};