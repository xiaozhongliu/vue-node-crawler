const router = require('express').Router();

adopt([
    './people',
    './dict'
]);

function adopt(routes) {
    routes.forEach(item => {
        require(item)(router);
    });
}

module.exports = router;