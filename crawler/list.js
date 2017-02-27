const fs = require('fs');
require('shelljs/global');
const {People}=require('../db');
const {fetch} = require('./util/index');

module.exports = function*(keyword, industry, location, url, report) {

    rm('-rf', './crawler/data');
    mkdir('-p', './crawler/data');

    let params = yield crawl();
    report('爬取结束,开始处理数据并写入数据库...');
    yield process(params);

    /**
     * fetch data
     */
    function* crawl() {
        return new Promise(resolve => {

            let index = 1;
            let maxPage = 1;
            let pageSize = 20;
            let pageCountGot = false;

            let heartbeat = () => {

                pageCountGot || report('正在计算数据总数...');
                if (index > maxPage) {
                    return resolve(maxPage)
                }

                fetch(`${url}&page=${index}`, $ => {

                    if (!pageCountGot) {
                        let criteria;
                        try {
                            criteria = JSON.parse($('code')[12].children[0].data).included.find(item => item.type == 'PRIMARY');
                        } catch (e) {
                            report(`错误:${e.message},重新开始...`);
                            index = 1;
                            return setTimeout(heartbeat, 2000)
                        }
                        let totalPage = Math.ceil(criteria.total / pageSize);
                        pageCountGot = true;
                        report(`共找到${criteria.total}条,${totalPage}页数据`);
                        if (maxPage > totalPage) {
                            return maxPage = totalPage
                        }
                        report(`官方策略限制,仅抓取前${maxPage}页`)
                    }

                    try {
                        fs.writeFile(`./crawler/data/page${index}.json`, $('code')[12].children[0].data);
                        report(`第${index}页爬取完毕`);
                        ++index
                    } catch (e) {
                        report(`错误:${e.message},重新开始...`);
                        index = 1
                    }

                    setTimeout(heartbeat, 2000)
                });
            };

            setTimeout(heartbeat, 2000)
        })
    }

    /**
     * process fetched data
     */
    function* process(maxPage) {

        //循环全部使用for以使所有SQL执行同步化避免重复插入数据
        for (let i = 1; i <= maxPage; i++) {

            let currentFile = `./data/page${i}.json`;
            delete require.cache[require.resolve(currentFile)];
            let raw = require(currentFile);
            let arr = raw.included.filter(item => item.$type == 'com.linkedin.voyager.identity.shared.MiniProfile');

            for (let j = 0; j < arr.length; j++) {
                let {
                    firstName = '',
                    lastName = '',
                    occupation,
                    publicIdentifier
                } = arr[j];

                //如果名字都为空则没有意义
                if (!firstName && !lastName) continue;

                let people = yield People.findOne({where: {linkedInID: publicIdentifier}});
                if (people) {
                    report(`数据已经存在: <span class=data>${JSON.stringify({
                        firstName,
                        lastName,
                        occupation
                    })}</span>`);
                    continue
                }

                /**
                 * process name
                 */
                let cname, ename;
                if (isEnglishName(firstName) || isEnglishName(lastName)) {
                    ename = `${firstName} ${lastName}`
                } else {
                    cname = `${lastName}${firstName}`
                }

                /**
                 * process title & company
                 */
                let title, company;

                //1.has /^CEO -/
                if (/^CEO -/i.test(occupation)) {
                    title = 'CEO';
                    company = occupation.substr(5).trim()
                } else if (/^Chief Executive Officer -/i.test(occupation)) {
                    title = 'CEO';
                    company = occupation.substr(25).trim()
                } else {

                    //2.has ' at '
                    let index = occupation.indexOf(' at ');
                    if (index != -1) {
                        title = occupation.substr(0, index).trim();
                        company = occupation.substr(index + 4).trim()
                    } else {
                        title = occupation
                    }

                    title = title.replace(/Chief Executive Officer/i, 'CEO');
                }

                /**
                 * save in db
                 */
                let newPeople = {
                    source: Enum.Source.LNKD.value,
                    linkedInID: publicIdentifier,
                    cname,
                    ename,
                    keyword,
                    industry,
                    title,
                    company,
                    location
                };
                report(`插入数据: <span class=data>${JSON.stringify({
                    cname,
                    ename,
                    keyword,
                    industry,
                    title,
                    company,
                    location
                })}</span>`);
                yield People.create(newPeople)
            }
        }
    }

    function isEnglishName(val) {
        return /^[\w\s]+$/.test(val)
    }
};