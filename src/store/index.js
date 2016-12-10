import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    strict : false,//在生产环境下面不要用严格模式,严格模式是state的改变只能是mutations
    modules : {
        user
    }
})