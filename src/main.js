import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'

import router from './router/index'
import store from './store/index'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
})

/*Vue.http.options.xhr = {withCredentials: true}*/

/*const routes = [{
  path : '/',
  component : Home
},{
  path : '/home',
  component : Home
}];

const router = new VueRouter({
  routes
});*/



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App,
})
