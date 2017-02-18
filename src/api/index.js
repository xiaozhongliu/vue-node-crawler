import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// ajax requests will send session cookie
Vue.http.options.credentials = true

export default {

    /**
     * get paged people
     * @returns {*}
     */
    getPeople(page, limit) {
        return GET('people', `&page=${page}&limit=${limit}`);
    }
}

function GET(url, queryString) {
    return Vue.http.get(`${config.API_HOST}${url}?clientHost=${location.hostname}${queryString}`)
}

function REDIRECT(url) {
    location.href = config.API_HOST + url
}