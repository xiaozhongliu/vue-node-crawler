import API from '../api'

export default {

    state: {
        people: {count: 0, rows: []}
    },

    getters: {
        people: state => state.people
    },

    mutations: {
        GET_PEOPLE (state, people) {
            Object.assign(state.people, people)
        }
    },

    actions: {
        getPeople({commit}, {
            currentPage = 1,
            pageSize = config.PAGE_SIZE,
            criteria = {}
        }) {
            API.getPeople(Object.assign({
                currentPage,
                pageSize
            }, criteria)).then(res => {
                commit('GET_PEOPLE', res.body)
            })
        }
    }
}