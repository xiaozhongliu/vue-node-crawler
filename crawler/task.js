let process = require('process');

process.on('message', (criteria) => {

    report('开始爬取...');
    for (let criterion of criteria) {
        console.log(criterion);
        report('done')
    }
    report('爬取结束');
});

function report(message) {
    process.send(message)
}