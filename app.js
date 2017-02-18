const {crawler, fetch} = require('./util');
const fs = require('fs');

const PAGE_URL = 'http://www.linkedin.com/search/results/people/?facetGeoRegion=%5B%22cn%3A8909%22%5D&keywords=CEO&origin=FACETED_SEARCH&suggestedEntities=%5B%22TITLE%22%5D&title=CEO&page=';
const MAX_PAGE = 50;

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

            setTimeout(heartbeat, 2000);
        });
    };

    setTimeout(heartbeat, 2000);
}

/**
 * process fetched data
 */
function process() {

    console.log('\n爬取结束,开始处理数据...\n');

    for (let i = 1; i <= MAX_PAGE; i++) {
        let raw = require(`./data/page${i}.json`);
        let arr = raw.included.filter(item => item.$type == 'com.linkedin.voyager.identity.shared.MiniProfile');
        arr.forEach(item => {
            console.log(`全名: ${item.firstName} ${item.lastName}`);
            console.log('就职:', item.occupation);
            console.log(`主页: https://www.linkedin.com/in/${item.publicIdentifier}\n`)
        });
    }
}