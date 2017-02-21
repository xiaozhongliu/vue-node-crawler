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
}