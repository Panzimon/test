/**
 * Created by ZY on 2017/2/9.
 */
const Koa = require('koa'),
    app = new Koa(),
    bodyParser = require('koa-bodyparser'),
    controller = require('./controller');

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');