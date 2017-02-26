const toolset = require('./toolset');

module.exports = {
    logger: require('./logger'),
    socket: require('./socket'),
    redis: require('./redisClient')(),
    validhelper: require('./validHelper'),
    customValidators: require('./customValidators'),
    hash: toolset.hash,
    sign: toolset.sign,
};