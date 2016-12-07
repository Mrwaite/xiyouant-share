import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from './components/Home'

import router from './router/index'

Vue.use(VueRouter);
Vue.use(VueResource);

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
  ...App,
})
