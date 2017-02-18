const crypto = require('crypto');

module.exports = {

    /**
     * md5 hash
     * @param target: original string
     * @returns {*}
     */
    hash(target) {
        let md5 = crypto.createHash('md5');
        md5.update(target);
        return md5.digest('hex');
    },

    /**
     * hmac sign
     * @param target: original string
     * @param key:    encryption secret
     * @returns {string|String|*}
     */
    sign(target, key) {
        let hmac = crypto.createHmac('sha1', key);
        return hmac.update(target).digest().toString('base64');
    },
};