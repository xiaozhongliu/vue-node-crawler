const co = require('co');
const fs = require('fs');
const {People}=require('../db');
const {crawler, fetch} = require('./util/index');
const {FacetGeoRegion}=require('./config');

const location = 'Shanghai';
const MAX_PAGE = 50;
const PAGE_URL = `http://www.linkedin.com/search/results/people/?facetGeoRegion=${FacetGeoRegion[location]}&keywords=CEO&origin=FACETED_SEARCH&suggestedEntities=%5B%22TITLE%22%5D&title=CEO&page=`;

fs.existsSync('./data') || fs.mkdirSync('./data');

crawler(fetcher);
//process();

/**
 * fetch data on page
 */
function fetcher() {

    let index = 1;

    let heartbeat = () => {

        if (index > MAX_PAGE) {
            return process()
        }

        fetch(PAGE_URL + index, $ => {

            try {
                fs.writeFile(`./data/page${index}.json`, $('code')[12].children[0].data);
                console.log(`第${index}页爬取完毕`);
                ++index
            } catch (e) {
                console.log(`错误:${e.message},重新开始...`);
                index = 1
            }

            setTimeout(heartbeat, 2000)
        });
    };

    setTimeout(heartbeat, 2000)
}

/**
 * process fetched data
 */
function process() {

    console.log('\n爬取结束,开始处理数据...\n');

    //循环全部使用for以使所有SQL执行同步化避免重复插入数据
    co(function*() {

        for (let i = 1; i <= MAX_PAGE; i++) {

            let raw = require(`./data/page${i}.json`);
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
                if (!people) {

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
                    yield People.create({
                        source: Enum.Source.LNKD.value,
                        linkedInID: publicIdentifier,
                        cname,
                        ename,
                        title,
                        company,
                        location
                    })
                }
            }
        }
    })
}

function isEnglishName(val) {
    return /^[\w\s]+$/.test(val)
}