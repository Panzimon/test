/**
 * Created by XYSM on 2017/2/25.
 */

import VueRouter from 'vue-router'
import index from './views/index'
import err from './views/404'

export const router = new VueRouter({
  routes: [
    { path: '/', component: index },
    { path: '*', component: err }
  ]
});
