import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/index.vue'
import login from '../components/login.vue'
import signup from '../components/signup.vue'

Vue.use(Router)

export default new Router({
    mode : 'history',
    routes : [
        {
            name : 'direction', 
            path : '/path/:direction', 
            /*component (resolve) {
                require(['../views/index/index.vue', resolve]);
            }*/
            component : index
        },/*
        { 
            path : '/article/:id', 
            component: createArticle() 
        },*/
        {
            path : '/',
            redirect : '/path/fe'
        },
        /*{
            name : 'login',
            path : '/login',
            components : {
                login : login
            }
        },
        {
            name : 'signup',
            path : '/signup',
            components : {
                login : signup
            }
        }*/
       
    ]
});