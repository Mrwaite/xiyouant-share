import Vue from 'vue'
import * as types from './mutations-types'
/*import userapi from '../api/user'*/

export default {
    state : {
        username : '',
        password : '',
        loginStatus : false
    },
    getters : {
        loginStatus : state => state.loginStatus
    },
    //mutations只允许编写同步代码
    mutations : {
        [types.USER_LOGIN] (state, name) {
            state.username = name
            
        },
        [types.USER_SIGNUP] (state, user) {

        },
        [types.USER_SIGNOUT] (state, user) {

        }
    },
    //actions可以编写异步代码,然后去commitmutations
    //actions返回premise对象可以,让两个异步顺序执行
    actions : {
        [types.USER_LOGIN]({ commit }, info) {
            userapi.login(info, (name) => {
                if(name) {
                    //说明数据库有该用户,登录成功
                    //设置session
                    state.loginStatus = true
                } else if (!name) {
                    //说明数据库没有该用户,登录失败
                    state.loginStatus = false
                }
                commit(USER_LOGIN, name);
            })
            /*state.loginStatus = true
            commit(USER_LOGIN, info);*/
        },
        [types.USER_SIGNUP]({ commit }, user) {
            commit(USER_SIGNUP, user);
        },
        [types.USER_SIGNOUT]({ commit }, user) {
            commit(USER_SIGNOUT, user);
        }
    }
}