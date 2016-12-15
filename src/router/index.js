import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/index.vue'
import login from '../components/login.vue'
import signup from '../components/signup.vue'
import signout from '../components/signout.vue'
import postNew from '../components/postNew.vue'
import article from '../views/index/article.vue'

Vue.use(Router)

export default new Router({
    mode : 'history',
    routes : [
        {
            name : 'direction', 
            path : '/path/:direction/:page', 
            /*component (resolve) {
                require(['../views/index/index.vue', resolve]);
            }*/
            components : {
                main : index
            }
        },
        {
            path : '/',
            redirect : '/path/fe/1'
        },
        {
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
        },
        {
            name : 'signout',
            path : '/signout',
            components : {
                login : signout
            }
        },
        {
            name : 'postNew',
            path : '/postNew',
            components :　{
                login : postNew
            }
        },
        {
            name : 'article',
            path: '/article/:direction/:_id',
            components:{
                main: article
            }
        }
       
    ]
});