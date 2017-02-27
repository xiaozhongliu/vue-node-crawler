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
        async getPeople({commit}, {
            page = 1,
            limit = config.PAGE_SIZE,
            criteria = {}
        }) {
            let res = await API.getPeople(Object.assign(
                {page, limit},
                criteria
            ));
            commit('GET_PEOPLE', res.body)
        }
    }
}