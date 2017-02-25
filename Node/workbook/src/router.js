/**
 * Created by XYSM on 2017/2/25.
 */

import VueRouter from 'vue-router'

export const router = new VueRouter({
  routes: [
    { path: '/', component: require('./views/index.vue') },
    { path: '*', component: require('./views/404.vue') }
  ]
});
