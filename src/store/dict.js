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
        async getDicts({}, type){
            return (await API.getDicts(type)).body
        },
        getDictTree({commit}) {
            getChildren(commit, 'Root')
        },
        async getDictTypes(){
            return (await API.getDictTypes()).body
        },
        async createDict({commit}, dict){
            let res = await API.createDict(dict);
            getChildren(commit, 'Root');
            return res.body
        },
        async updateDict({commit}, dict){
            await API.updateDict(dict);
            getChildren(commit, 'Root')
        },
        async deleteDict({commit}, dict){
            await API.deleteDict(dict);
            getChildren(commit, 'Root')
        }
    }
}

async function getChildren(commit, type) {
    let res = await API.getDicts(type);
    commit('GET_DICT', res.body);
    res.body.forEach(item => {
        item.keyBeforeUpdate = item.key;
        item.displayName = `${item.key} ${item.desc || ''}`;
        if (item.hasChild) {
            getChildren(commit, item.key)
        }
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
                let inner = getTarget(item, type);
                if (inner && inner.key == type) {
                    return inner
                }
            }
        }
    }
}