import Vue from 'vue'
import * as types from './mutations-types'
import userapi from '../api/user'

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
        [types.USER_SIGNUP] (state, name) {
            state.username = name
        },
        [types.USER_SIGNOUT] (state, user) {

        }
    },
    //actions可以编写异步代码,然后去commitmutations
    //actions返回premise对象可以,让两个异步顺序执行
    actions : {
        [types.USER_LOGIN]({ commit, state }, info) {
            userapi.login(info, (res) => {
                /*console.log(name)*/
                if(res.err) {
                    res.err === "用户不存在" ? console.log('用户不存在') : console.log('密码错误')
                    state.loginStatus = false
                } else if (res.success) {
                    //说明数据库没有该用户,登录失败
                    state.loginStatus = true
                    commit(types.USER_LOGIN, res.success);
                }              
            })
            /*state.loginStatus = true
            commit(USER_LOGIN, info);*/
        },
        [types.USER_SIGNUP]({ commit, state }, info) {
            userapi.signup(info, (res) => {
                /*console.log(res);*/
                if (res.err) {
                    console.log(res.err);
                    state.loginStatus = false
                } else if (res.success) {
                    state.loginStatus = true
                    commit(types.USER_SIGNUP, res.success);
                }
                
            })
           /* commit(types.USER_SIGNUP, user);*/
        },
        [types.USER_SIGNOUT]({ commit }, user) {
            commit(types.USER_SIGNOUT, user);
        }
    }
}