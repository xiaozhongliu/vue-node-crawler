const {People}=require('../db');

module.exports = router => {

    router.get('/people', (req, res) => {

        let {
            page = 1,
            limit = 20,
            source = 0,
            cname = '',
            ename = '',
            title = '',
            company = '',
            location = ''
        } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        let where = getCriteria({
            source: parseInt(source),
            cname,
            ename,
            title,
            company,
            location
        });

        People.findAndCountAll({
            offset: (page - 1) * limit,
            limit,
            where,
            order: ['ename', 'cname'],
            raw: true
        }).then(function (result) {
            res.json(result)
        })
    })
};

/**
 * fuzzy search for string and precise search for number
 */
function getCriteria(obj) {
    let criteria = {};
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        if (value) {
            criteria[key] = typeof value == 'string' ?
                {$like: `%${value}%`}
                : value
        }
    });
    return criteria
}