const request = require('request');
const cheerio = require('cheerio');
const url = require('url');
const {username, password} = require('../account.json');

const loginURL = 'https://www.linkedin.com/';

module.exports = callback => {

    request(loginURL, {
        // The jar option isn't necessary for simplecrawler integration, but it's
        // the easiest way to have request remember the session cookie between this
        // request and the next
        jar: true
    }, function (error, response, body) {

        // We want to get the names and values of all relevant inputs on the page,
        // so that any CSRF tokens or similar things are included in the POST
        // request
        let $ = cheerio.load(body);
        let formDefaults = {};
        // You should adapt these selectors so that they target the
        // appropriate form and inputs
        let formAction = $('.login-form').attr('action');
        let loginInputs = $('input');

        // We loop over the input elements and extract their names and values so
        // that we can include them in the login POST request
        loginInputs.each(function (i, input) {
            let inputName = $(input).attr('name');
            formDefaults[inputName] = $(input).val()
        });

        // Time for the login request!
        request.post(url.resolve(loginURL, formAction), {

            // We can't be sure that all of the input fields have a correct default
            // value. Maybe the user has to tick a checkbox or something similar in
            // order to log in. This is something you have to find this out manually
            // by logging in to the site in your browser and inspecting in the
            // network panel of your favorite dev tools what parameters are included
            // in the request.
            form: Object.assign(formDefaults, {
                session_key: username,
                session_password: password
            }),
            // We want to include the saved cookies from the last request in this one
            jar: true
        }, function (error, response, body) {
            callback()
        })
    })
};