import API from '../api'

export default {

    state: {
        criteria: {count: 0, rows: []}
    },

    getters: {
        criteria: state => state.criteria
    },

    mutations: {
        GET_CRITERIA (state, criteria) {
            Object.assign(state.criteria, criteria)
        }
    },

    actions: {
        getCriteria({commit}, {
            page = 1,
            limit = config.PAGE_SIZE
        }) {
            return new Promise((resolve) => {
                API.getCriteria({page, limit}).then(res => {
                    res.body.rows.forEach(item => {
                        item.executedText = item.executed ? '已经执行录入' : ''
                    });
                    commit('GET_CRITERIA', res.body);
                    resolve()
                })
            })
        },

        bulkCreateCriteria({commit}, {
            keywords,
            industries,
            locations
        }){
            let criteria = [];
            keywords.forEach(keyword => {
                industries.forEach(industry => {
                    locations.forEach(location => {
                        criteria.push({
                            keyword: keyword.key,
                            industry: industry.key,
                            location: location.key,
                            url: `https://www.linkedin.com/search/results/people/?facetGeoRegion=${location.value}&facetIndustry=${industry.value}&keywords=${keyword.key}&origin=FACETED_SEARCH`,
                            executed: false
                        })
                    })
                })
            });
            return new Promise((resolve) => {
                API.bulkCreateCriteria({criteria}).then((result) => {
                    API.getCriteria({
                        page: 1,
                        limit: config.PAGE_SIZE
                    }).then(res => {
                        res.body.rows.forEach(item => {
                            item.executedText = item.executed ? '已经执行录入' : ''
                        });
                        commit('GET_CRITERIA', res.body);
                        resolve(result.body)
                    })
                })
            })
        }
    }
}