const router = require('express').Router();

adopt([
    './common',
    './people',
    './criteria',
    './dict'
]);

function adopt(routes) {
    routes.forEach(item => {
        require(item)(router);
    });
}

module.exports = router;