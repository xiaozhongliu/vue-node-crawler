const process = require('process');
const co = require('co');
const list = require('./list');
const {authorize} = require('./util/index');
const {username} = require('./account.json');

process.on('message', (criteria) => {
    co(function*() {

        report('开始处理');
        report(`正在使用账号${username}登陆领英...`);
        yield authorize();
        report('领英登录成功');

        for (let {
            keyword,
            industry,
            location,
            url
        } of criteria) {
            report('');
            report(`>>>>>>>>开始按照条件[Keyword:${keyword},Industry:${industry},Location:${location}]爬取数据`);
            yield list(keyword, industry, location, url, report)
        }
        report('');
        report('处理完成')
    })
});

function report(message) {
    process.send(message)
}