import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// ajax requests will send session cookie
Vue.http.options.credentials = true

export default {

    getPeople(criteria) {
        return GET('people', serialize(criteria));
    },

    getCriteria(criteria){
        return GET('criteria', serialize(criteria));
    },

    bulkCreateCriteria(criteria){
        return POST('criteria', criteria)
    },

    getLocationList(){
        return GET('locations')
    },

    crawl(criteria){
        return POST('crawl', criteria)
    },

    getDicts(type){
        return GET('dict/' + type)
    },

    getDictTypes(){
        return GET('dictTypes');
    },

    createDict(dict){
        return POST('dict', dict)
    },

    updateDict(dict){
        return PUT('dict', dict)
    },

    deleteDict(dict){
        return DELETE('dict', dict)
    },
}

/**
 * request methods encapsulation
 */
function GET(url, queryString = '') {
    return Vue.http.get(`${getCommonUrl(url)}${queryString}`)
}
function POST(url, body) {
    return Vue.http.post(`${getCommonUrl(url)}`, body, {})
}
function PUT(url, body) {
    return Vue.http.put(`${getCommonUrl(url)}`, body, {})
}
function DELETE(url, body) {
    return Vue.http.delete(`${getCommonUrl(url)}`, {body})
}
function REDIRECT(url) {
    location.href = `${getCommonUrl(url)}` + url
}

/**
 * helpers
 */
function getCommonUrl(url) {
    return `${config.API_HOST}${url}?clientHost=${location.hostname}`
}
function serialize(obj) {
    let arr = [];
    Object.keys(obj).forEach(key => {
        if (obj[key]) {
            arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        }
    });
    return '&' + arr.join('&')
}