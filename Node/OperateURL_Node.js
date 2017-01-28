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
    app = new Koa();//不要忘了new。。。

app.use(async (ctx,next)=>{
    "use strict";
   console.log(`Preocess ${ctx.request.method} 
${ctx.request.url}...`);
   await next();
});

router.get('/hello/:name',async (ctx,next)=>{
    "use strict";
   var name = ctx.params.name;
   ctx.response.body = `<h1>Hello,${name} !</h1>`;
});
router.get('/',async (ctx,next)=>{
    "use strict";
   ctx.response.body = '<h1>Index Page</h1>'
});

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
/*

 */