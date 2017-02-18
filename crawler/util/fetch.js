const request = require('request');
const cheerio = require('cheerio');

module.exports = (url, callback) => {

    request(url, {
        jar: true
    }, function (error, response, body) {
        let $ = cheerio.load(body);
        callback($)
    })
};