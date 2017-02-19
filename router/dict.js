const {Dict}=require('../db');

module.exports = router => {

    router.get('/dict/:type', (req, res) => {

        let type = req.params.type;

        Dict.findAndCount({
            where: {type},
            order: ['key'],
            raw: true
        }).then(function (result) {
            res.json(result)
        })
    })
};