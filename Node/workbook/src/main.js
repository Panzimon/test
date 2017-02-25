// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store'
import VueRouter from 'vue-router'
import {router} from './router'
require('./assets/darkness.css');

Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h('router-view')
});
