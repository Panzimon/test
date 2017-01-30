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
/*
 根据原来的url2-koa创建工程view-koa，把koa2、Nunjucks整合起来，
 然后，把原来直接输出字符串的方式，
 改为ctx.render(view, model)的方式
 */
/*
 登录请求是一个POST，
 我们就用ctx.request.body.<name>
 拿到POST请求的数据，并给一个默认值。

 登录成功时我们用signin-ok.html渲染，
 登录失败时我们用signin-failed.html渲染，
 所以，我们一共需要以下3个View：

 index.html
 signin-ok.html
 signin-failed.html
 */

/*
 注意：也可以去npm搜索能用于koa2的处理静态文件的包并直接使用。
 */

/*
 集成Nunjucks实际上也是编写一个middleware，
 这个middleware的作用是给ctx对象绑定一个render(view, model)的方法，
 这样，后面的Controller就可以调用这个方法来渲染模板了
 */
/*
 一切顺利的话，
 这个view-koa工程应该可以顺利运行。
 运行前，我们再检查一下app.js里的middleware的顺序：

 第一个middleware是记录URL以及页面执行时间：
 第二个middleware处理静态文件：
 第三个middleware解析POST请求：
 第四个middleware负责给ctx加上render()来使用Nunjucks：
 最后一个middleware处理URL路由：
 */

/*
 ctx.render内部渲染模板时，
 Model对象并不是传入的model变量，而是：

 Object.assign({}, ctx.state || {}, model || {})
 这个小技巧是为了扩展。

 首先，model || {}确保了即使传入undefined，model也会变为默认值{}。Object.assign()会把除第一个参数外的其他参数的所有属性复制到第一个参数中。第二个参数是ctx.state || {}，这个目的是为了能把一些公共的变量放入ctx.state并传给View。

 例如，某个middleware负责检查用户权限，
 它可以把当前用户放入ctx.state中：

 app.use(async (ctx, next) => {
 var user = tryGetUserFromCookie(ctx.request);
 if (user) {
 ctx.state.user = user;
 await next();
 } else {
 ctx.response.status = 403;
 }
 });

 这样就没有必要在每个Controller的async函数中都把user变量放入model中
 */