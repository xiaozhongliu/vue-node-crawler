const request = require('request');
const cheerio = require('cheerio');

module.exports = (url, callback) => {

    request(url, {
        // The jar option isn't necessary for simplecrawler integration, but it's
        // the easiest way to have request remember the session cookie between this
        // request and the next
        jar: true
    }, function (error, response, body) {
        let $ = cheerio.load(body);
        callback($)
    })
};