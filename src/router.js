import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: resolve => require(['./com/People.vue'], resolve)
        },
        {
            path: '/criteria',
            component: resolve => require(['./com/Criteria.vue'], resolve)
        },
        {
            path: '/crawler',
            component: resolve => require(['./com/Crawler.vue'], resolve)
        },
        {
            path: '/dict',
            component: resolve => require(['./com/Dict.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})