import Vuex from 'vuex';
import Vue from 'vue';
import common from './common'
import people from './people'
import criteria from './criteria'
import dict from './dict'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        common,
        people,
        criteria,
        dict,
    }
})