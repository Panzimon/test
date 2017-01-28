/**
 * Created by ZY on 2017/1/28.
 */
/*
 在hello-koa工程中，我们处理http请求一律返回相同的HTML
 正常情况下，我们应该对不同的URL调用不同的处理函数，
 这样才能返回不同的结果
 */
/*
如：
 app.use(async (ctx, next) => {
 if (ctx.request.path === '/') {
 ctx.response.body = 'index page';
 } else {
 await next();
 }
 });

 app.use(async (ctx, next) => {
 if (ctx.request.path === '/test') {
 ctx.response.body = 'TEST page';
 } else {
 await next();
 }
 });

 app.use(async (ctx, next) => {
 if (ctx.request.path === '/error') {
 ctx.response.body = 'ERROR page';
 } else {
 await next();
 }
 });这么写是可以运行的，但是好像有点蠢。

 应该有一个能集中处理URL的middleware，
 它根据不同的URL调用不同的处理函数
 */
/*
 koa-router

 为了处理URL，
 我们需要引入koa-router这个middleware，
 让它负责处理URL映射
 */
const Koa = require('koa'),
    router = require('koa-router')(),
    bodyParser = require('koa-bodyparser');
    app = new Koa();//不要忘了new。。。

app.use(async (ctx,next)=>{
    "use strict";
   console.log(`Preocess ${ctx.request.method} 
${ctx.request.url}...`);
   await next();
});

app.use(bodyParser());//放在后面的话解析不了body

router.get('/hello/:name',async (ctx,next)=>{
    "use strict";
   var name = ctx.params.name;
   ctx.response.body = `<h1>Hello,${name} !</h1>`;
});
router.get('/',async (ctx,next)=>{
    "use strict";
   ctx.response.body = `<h1>Index Page</h1>
    <form action ="/signin" method="post">
        <p>Name:<input name="name" value="koa"> </p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
</form>`;
});

router.post('/signin',async (ctx,next)=>{
    "use strict";
    var
        name = ctx.request.body.name ||'',
        password = ctx.request.body.password ||'';
    console.log(`signin with name : ${name},
     password : ${password}`);
    if (name ==='koa' && password ==='12345'){
        ctx.response.body = `<h1>Welcome, ${name} !</h1>`;
    }else {
        ctx.response.body = `<h1>Login Failed!!!</h1>
        <p><a href="/">Try again~</a> </p>`;
    }
});

app.use(router.routes());


app.listen(3000);
console.log('app started at port 3000...');
/*
 用router.get('/path', async fn)处理的是get请求。
 如果要处理post请求，
 可以用router.post('/path', async fn)
 */
/*
 问题：post请求通常会发送一个表单，
 或者JSON，它作为request的body发送，
 但无论是Node.js提供的原始request对象，
 还是koa提供的request对象，都不提供解析request的body的功能！

 所以，
 我们又需要引入另一个middleware来解析原始request请求，
 然后，把解析后的参数，绑定到ctx.request.body中。

 koa-bodyparser
 "koa-bodyparser": "3.2.0"
 */

