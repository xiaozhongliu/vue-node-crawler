const fs = require('fs');
const log4js = require('log4js');
const config = require('../config')();

let appenders = [{
    type: 'dateFile',
    category: 'SITE',
    filename: `${config.API_LOG_PATH}`,
    pattern: 'yyyyMMdd.log',
    alwaysIncludePattern: true,
    layout: {
        type: 'pattern',
        pattern: '%d{ISO8601} [%c] - %m'
    }
}];

//no prod logs also output to onsole
config.DEBUG && appenders.push({type: 'console'});

//create the log path if it doesn't exist
fs.existsSync(config.API_LOG_PATH) || fs.mkdirSync(config.API_LOG_PATH);

log4js.configure({appenders});
let logger = log4js.getLogger('SITE');
logger.setLevel('INFO');

module.exports = logger;