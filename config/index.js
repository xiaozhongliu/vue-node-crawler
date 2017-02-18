module.exports = (() => {

    let _config;

    return function () {
        if (!_config) {
            try {
                _config = require('../config/base');
                let custom_config = require(`../config/${_config.NODE_ENV}`);
                Object.assign(_config, custom_config);
            } catch (e) {
                console.log('Please make sure environment variable NODE_ENV is set.');
                process.exit();
            }
        }
        return _config;
    }
})();