import API from '../api'

export default {

    state: {
        activeMenuIndex: '1'
    },

    getters: {
        activeMenuIndex: state => state.activeMenuIndex
    },

    mutations: {
        ACTIVATE_MENU (state, index) {
            state.activeMenuIndex = index
        }
    },

    actions: {
        async getLocationList(){
            return (await API.getLocationList()).body
        },
        async crawl({}, criteria) {
            return await API.crawl({criteria})
        }
    }
}