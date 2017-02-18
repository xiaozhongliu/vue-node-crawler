export default {

    state: {
        isMenuShow: false
    },

    getters: {
        isMenuShow: state => state.isMenuShow
    },

    mutations: {
        TOGGLE_MENU (state, isHide) {
            state.isMenuShow = isHide ? false : !state.isMenuShow
        }
    },
}