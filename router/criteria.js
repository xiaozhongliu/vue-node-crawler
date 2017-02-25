const co = require('co');
const {Criteria}=require('../db');

module.exports = router => {

    router.get('/criteria', (req, res, next) => {
        co(function*() {

            let {
                page = 1,
                limit = 20
            } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);

            res.json(yield Criteria.findAndCountAll({
                offset: (page - 1) * limit,
                limit,
                raw: true
            }))

        }).catch(next);
    });

    router.post('/criteria', (req, res, next) => {
        co(function*() {

            let result = {
                existed: 0,
                inserted: 0
            };

            for (let newCriterion of req.body.criteria) {
                let criterion = yield Criteria.findOne({
                    where: {
                        keyword: newCriterion.keyword,
                        industry: newCriterion.industry,
                        location: newCriterion.location
                    }
                });
                if (!criterion) {
                    yield Criteria.create(newCriterion);
                    result.inserted += 1
                } else {
                    result.existed += 1
                }
            }
            res.json(result)

        }).catch(next);
    })
};