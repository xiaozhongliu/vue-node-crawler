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
        getPeople({commit}, {currentPage = 1, pageSize = 20}) {
            API.getPeople(currentPage, pageSize).then(res => {
                res.body.rows.forEach(item => {
                    item.fullName = isEnglishName(item.firstName) || isEnglishName(item.lastName) ?
                        `${item.firstName} ${item.lastName}` :
                        `${item.lastName}${item.firstName}`
                });
                commit('GET_PEOPLE', res.body)
            })
        }
    }
}

function isEnglishName(val) {
    return /^[\w\s]+$/.test(val)
}