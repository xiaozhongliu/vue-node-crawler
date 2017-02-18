const {People}=require('../db');

module.exports = router => {

    router.get('/people', (req, res, next) => {

        let {
            page = 1,
            limit = 20
        } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        People.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            order: ['firstName']
        }).then(function (result) {
            res.json(result)
        })
    })
};