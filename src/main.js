import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'

import router from './router/index'
import store from './store/index'

import * as filters from './filters/index'

import './public/stylesheets/font.css'
/*import './public/stylesheets/font-awesome.min.css'*/

/*import Icon from 'vue-awesome/components/Icon.vue'*/
import '../node_modules/vue-awesome/dist/vue-awesome'
/*import './public/stylesheets/font.css'*/

Vue.use(VueRouter);
Vue.use(VueResource);


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

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
