/**
 * Created by ZY on 2017/2/11.
 */

/*
 当我们用Node.js有了一整套后端开发模型后，
 我们对前端开发也会有新的认识。
 由于前端开发混合了HTML、CSS和JavaScript，而且页面众多，
 所以，代码的组织和维护难度其实更加复杂，这就是MVVM出现的原因
 */

 /*
  所以，服务器就需要针对不同的用户，动态生成不同的html文件。
  一个最直接的想法就是利用C、C++这些编程语言，
  直接向浏览器输出拼接后的字符串。
  这种技术被称为CGI：Common Gateway Interface。
  */

 /*
  如果浏览器想要自己修改HTML页面的内容，
  就需要等到1995年年底，JavaScript被引入到浏览器
  */

 /*
  MVVM最早由微软提出来，它借鉴了桌面应用程序的MVC思想，
  在前端页面中，
  把Model用纯JavaScript对象表示，View负责显示，
  两者做到了最大限度的分离。

  把Model和View关联起来的就是ViewModel。
  ViewModel负责把Model的数据同步到View显示出来，
  还负责把View的修改同步回Model
  */

 /*
  这就是MVVM的设计思想：关注Model的变化，
  让MVVM框架去自动更新DOM的状态，
  从而把开发者从操作DOM的繁琐步骤中解脱出来！
  */

 /*
  MVVM框架哪家强？

  目前，常用的MVVM框架有：

  Angular：Google出品，名气大，但是很难用；

  Backbone.js：入门非常困难，因为自身API太多；

  Ember：一个大而全的框架，想写个Hello world都很困难。

  我们选择MVVM的目标应该是入门容易，安装简单，
  能直接在页面写JavaScript，需要更复杂的功能时又能扩展支持。

  所以，综合考察，最佳选择是尤雨溪大神开发的MVVM框架：Vue.js
  */

 /*
  要特别注意的是，在<head>内部编写的JavaScript代码，
  需要用jQuery把MVVM的初始化代码推迟到页面加载完毕后执行，
  否则，直接在<head>内执行MVVM代码时，DOM节点尚未被浏览器加载，
  初始化将失败。正确的写法如下：

  <html>
  <head>

  <!-- 引用jQuery -->
  <script src="/static/js/jquery.min.js"></script>

  <!-- 引用Vue -->
  <script src="/static/js/vue.js"></script>

  <script>
  // 初始化代码:
  $(function () {
  var vm = new Vue({
  el: '#vm',
  data: {
  name: 'Robot',
  age: 15
  }
  });
  window.vm = vm;
  });
  </script>

  </head>

  <body>

  <div id="vm">
  <p>Hello, {{ name }}!</p>
  <p>You are {{ age }} years old!</p>
  </div>

  </body>
  <html>
  */
 /*
  当用户提交表单时，传统的做法是响应onsubmit事件，
  用jQuery获取表单内容，检查输入是否有效，最后提交表单，
  或者用AJAX提交表单。

  现在，获取表单内容已经不需要了，
  因为双向绑定直接让我们获得了表单内容，并且获得了合适的数据类型。

  响应onsubmit事件也可以放到VM中。我们在<form>元素上使用指令：

  <form id="vm" v-on:submit.prevent="register">
  其中，v-on:submit="register"指令就会自动监听表单的submit事件，
  并调用register方法处理该事件。使用.prevent表示阻止事件冒泡，
  这样，浏览器不再处理<form>的submit事件。
  */

 /*

  */