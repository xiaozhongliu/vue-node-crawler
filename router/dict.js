const {Dict}=require('../db');

module.exports = router => {

    router.get('/dict/:type', (req, res) => {

        let type = req.params.type;

        Dict.findAndCount({
            where: {type},
            order: ['key'],
            raw: true
        }).then(result => {
            res.json(result)
        })
    });

    router.post('/dict', (req, res) => {
        Dict.create(req.body).then(result => {
            res.json(result)
        })
    });

    router.put('/dict', (req, res) => {
        Dict.update(req.body, {
            where: {dictId: req.body.dictId}
        }).then(result => {
            res.json(result)
        })
    });

    router.delete('/dict/:dictId', (req, res) => {
        Dict.destroy({
            where: {dictId: req.params.dictId}
        }).then(result => {
            res.json(result)
        })
    })
};