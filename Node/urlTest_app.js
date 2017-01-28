/**
 * Created by ZY on 2017/1/29.
 */
const
    Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    controller = require('./urlTest_Controller'),
    app = new Koa();

app.use(async (ctx,next)=>{
    "use strict";
    console.log(`Process 
        ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(bodyParser());
app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');
/*
var files = fs.readdirSync(__dirname + '/controllers');

var js_Files = files.filter((f)=>{
    "use strict";
    return f.endsWith('.js');
});
for (var f of js_Files){
    "use strict";
    console.log(`Process controller : ${f}...`);
    let mapping = require(__dirname +'/controllers/'+ f);
    for (var url in mapping){
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}*/
/*
或者再拆分更小一点
 function addMapping(router, mapping) {
 for (var url in mapping) {
 if (url.startsWith('GET ')) {
 var path = url.substring(4);
 router.get(path, mapping[url]);
 console.log(`register URL mapping: GET ${path}`);
 } else if (url.startsWith('POST ')) {
 var path = url.substring(5);
 router.post(path, mapping[url]);
 console.log(`register URL mapping: POST ${path}`);
 } else {
 console.log(`invalid URL: ${url}`);
 }
 }
 }

 function addControllers(router) {
 var files = fs.readdirSync(__dirname + '/controllers');
 var js_files = files.filter((f) => {
 return f.endsWith('.js');
 });

 for (var f of js_files) {
 "use strict";
 console.log(`process controller: ${f}...`);
 let mapping = require(__dirname + '/controllers/' + f);
 addMapping(router, mapping);
 }
 }

 addControllers(router);
 */
