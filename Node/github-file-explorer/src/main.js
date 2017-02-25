import Vue from 'vue'
//import axios from 'axios'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource);
//Vue.use(axios);
//Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  render: h => h(App)
});

//很尴尬。。文件夹名字错了。。。

/*
 A，App作为父组件，建议App中不写业务逻辑，作为应用的layout，根据需求，做一个布局。比如：Header/Container/Sidebar。
 B，Github是App组件的子组件，同时也是FileExplorer组件的父组件，实现form表单获取github文件API列表。
 C，FileExplorer组件为Github组件的子组件，实现列表清单。
 */

/*
 父组件与子组件间通讯(使用Props传递数据)：

 组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。
 */

/*
虽然下载了axios但是没有用。。。
虽然大概跟vue-resource没什么差别但是，毕竟没有真实例子，或者说
没有demo模板，不敢冒这个险
用了之后怎么都不对，日了狗一般，哼~
 */

//蛋疼。。。<legend>竟然是一个html标签。。。我还以为是一个组件，想了半天，
// 嘿~怎么找不到哪里有定义呢。。。

// p.s.组件FileExplorer对应的是<file-explorer>

//Learn from:
// https://segmentfault.com/a/1190000005651367#articleHeader7