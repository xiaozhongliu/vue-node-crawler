import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// ajax requests will send session cookie
Vue.http.options.credentials = true

export default {

    getPeople(criteria) {
        return GET('people', serialize(criteria));
    },

    getDict(type){
        return GET('dict/' + type)
    },

    createDict(dict){
        return POST('dict', dict)
    },

    updateDict(dict){
        return PUT('dict', dict)
    },

    deleteDict(dictId){
        return DELETE('dict/' + dictId)
    }
}

function GET(url, queryString = '') {
    return Vue.http.get(`${config.API_HOST}${url}?clientHost=${location.hostname}${queryString}`)
}

function POST(url, body) {
    return Vue.http.post(`${config.API_HOST}${url}?clientHost=${location.hostname}`, body, {})
}

function PUT(url, body) {
    return Vue.http.put(`${config.API_HOST}${url}?clientHost=${location.hostname}`, body, {})
}

function DELETE(url) {
    return Vue.http.delete(`${config.API_HOST}${url}?clientHost=${location.hostname}`, {}, {})
}

function REDIRECT(url) {
    location.href = `${config.API_HOST}${url}?clientHost=${location.hostname}` + url
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