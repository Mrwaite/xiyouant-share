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
        [types.USER_SIGNOUT] (state) {
            state.username = ''
        },
        [types.USER_CHECK] (state, name) {
            state.username = name
        },
        [types.USER_POSTNEW] (state, name) {
        
        },
        [types.COMMENT_SAVE] (state, name) {

        }
    },
    //actions可以编写异步代码,然后去commitmutations
    //actions返回premise对象可以,让两个异步顺序执行
    actions : {
        [types.USER_LOGIN]({ commit, state, rootState }, info) {
            userapi.login(info, (res) => {
                /*console.log(name)*/
                if(res.err) {
                    res.err === "用户不存在" ? rootState.alertMessage = '用户不存在' : rootState.alertMessage = '密码错误'
                    state.loginStatus = false
                } else if (res.success) {
                    rootState.alertMessage = '登录成功'
                    state.loginStatus = true
                    commit(types.USER_LOGIN, res.success);
                }              
            })
            /*state.loginStatus = true
            commit(USER_LOGIN, info);*/
        },
        [types.USER_SIGNUP]({ commit, state, rootState }, info) {
            userapi.signup(info, (res) => {
                /*console.log(res);*/
                if (res.err) {
                    rootState.alertMessage = res.err
                    state.loginStatus = false
                } else if (res.success) {
                    rootState.alertMessage = '注册成功'
                    state.loginStatus = true
                    commit(types.USER_SIGNUP, res.success);
                }
                
            })
           /* commit(types.USER_SIGNUP, user);*/
        },
        [types.USER_SIGNOUT]({ commit, state, rootState }) {
            userapi.signout(() => {
                rootState.alertMessage = '登出成功'
                state.loginStatus = false
                commit(types.USER_SIGNOUT);
            })
            
        },
        [types.USER_CHECK]({ commit,state, rootState }) {
            console.log('check')
            userapi.check((res) => {
                if(res.err) {
                    state.loginStatus = false
                } else if(res.success) {
                    state.loginStatus = true
                    commit(types.USER_CHECK, res.success)
                }
            })
        },
        [types.USER_POSTNEW]({ commit, state, rootState }, topic) {
            console.log('postNew')
            userapi.postNew(topic, (res) => {
                if(res.err) {
                    rootState.alertMessage = res.err
                } else if (res.success) {
                    rootState.alertMessage == '发布成功'
                    console.log(res.success)
                    commit(types.USER_POSTNEW)
                }                
            })
        },
        [types.COMMENT_SAVE]({ commit, state, rootState }, {content, _id, type}) {
            console.log('commentSave')
            userapi.commentSave(content, _id, type, (res) => {
                if(res.err) {
                    rootState.alertMessage = res.err
                } else if (res.success) {
                    rootState.alertMessage = res.success
                    console.log(res.success)
                    commit(types.COMMENT_SAVE)
                }
            })
        }
    }
}