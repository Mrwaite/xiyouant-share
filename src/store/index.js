import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

import * as types from './mutations-types'

Vue.use(Vuex)

export default new Vuex.Store({
    strict : false,//在生产环境下面不要用严格模式,严格模式是state的改变只能是mutations
    state : {
        alertMessage : '',
        articles: []
    },
    modules : {
        user
    },
    mutations: {
        [types.ARTICLES_SAVE] (state) {

        }
    },
    actions: {
        [types.ARTICLES_SAVE] ({ commit, state }, articles) {
            state.articles = articles;
            commit(types.ARTICLE_SAVE);
        }
    }
})