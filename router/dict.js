const co = require('co');
const {Dict}=require('../db');

module.exports = router => {

    router.get('/dict/:type', (req, res, next) => {
        co(function*() {

            res.json(yield Dict.findAll({
                where: {type: req.params.type},
                order: ['key'],
                raw: true
            }))

        }).catch(next);
    });

    router.get('/dictTypes', (req, res, next) => {
        co(function*() {

            res.json(yield Dict.findAll({
                where: {hasChild: true},
                attributes: ['key'],
                order: ['type'],
                raw: true
            }))

        }).catch(next);
    });

    router.post('/dict', (req, res, next) => {
        co(function*() {

            let parent = yield Dict.findOne({
                where: {key: req.body.type}
            });
            if (parent && !parent.hasChild) {
                yield Dict.update({hasChild: true}, {
                    where: {dictID: parent.dictID}
                })
            }

            let result = yield Dict.create(req.body);
            res.json(result);

        }).catch(next);
    });

    router.put('/dict', (req, res, next) => {
        co(function*() {

            let result = yield Dict.update(req.body, {
                where: {dictID: req.body.dictID}
            });

            if (req.body.hasChild && req.body.key != req.body.keyBeforeUpdate) {
                yield Dict.update({type: req.body.key}, {
                    where: {type: req.body.keyBeforeUpdate}
                })
            }

            res.json(result);

        }).catch(next);
    });

    router.delete('/dict', (req, res, next) => {
        co(function*() {

            let result = yield Dict.destroy({
                where: {dictID: req.body.dictID}
            });
            let siblings = yield Dict.findAll({
                where: {type: req.body.type},
                raw: true
            });
            if (siblings.length == 0) {
                let parent = yield Dict.findOne({
                    where: {key: req.body.type}
                });
                if (parent.hasChild) {
                    yield Dict.update({hasChild: false}, {
                        where: {dictID: parent.dictID}
                    })
                }
            }

            res.json(result);

        }).catch(next);
    })
};