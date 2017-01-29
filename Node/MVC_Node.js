/**
 * Created by ZY on 2017/1/29.
 */
//刚刚我们用到的，KOA处理URL+Nunjucks渲染模板+最后呈现给用户的页面
// 就是传说中的MVC‘模型-视图-控制器’

/*
 异步函数是C：Controller，Controller负责业务逻辑，
 比如检查用户名是否存在，取出用户信息等等；

 包含变量{{ name }}的模板就是V：
 View，View负责显示逻辑，通过简单地替换一些变量，View最终输出的就是用户看到的HTML。

 MVC中的Model在哪？
 Model是用来传给View的，这样View在替换变量的时候，
 就可以从Model中取出相应的数据。

 上面的例子中，Model就是一个JavaScript对象：

 { name: 'Michael' }
 */
