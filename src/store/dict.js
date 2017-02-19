import API from '../api'

export default {

    state: {
        dict: {key: 'Root', desc: '根节点', children: []}
    },

    getters: {
        dict: state => state.dict
    },

    mutations: {
        GET_DICT (state, dicts) {
            let target = getTarget(state.dict, dicts[0].type);
            target.children = dicts
        }
    },

    actions: {
        getDict({commit}, {type = 'Root'}) {
            getChildren(commit, type)
        }
    }
}

function getChildren(commit, type) {
    API.getDict(type).then(res => {
        commit('GET_DICT', res.body.rows);
        res.body.rows.forEach(item => {
            if (item.hasChild) {
                getChildren(commit, item.key)
            }
        })
    })
}

function getTarget(dict, type) {
    if (dict.key == type) {
        return dict
    } else {
        for (let item of dict.children) {
            if (item.key == type) {
                return item
            }
            if (item.children) {
                return getTarget(item, type)
            }
        }
    }
}