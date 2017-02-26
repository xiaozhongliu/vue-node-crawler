module.exports = router => {

    router.post('/crawl', (req, res) => {

        const child = require('child_process').fork('./crawler/task');
        child.send(req.body.criteria);
        child.on('message', message => {
            global.broadcast(message);
            message == '处理完成' && child.kill()
        });
        res.json()
    })
};