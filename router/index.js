const router = require('express').Router();

adopt([
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