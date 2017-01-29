/**
 * Created by ZY on 2017/1/29.
 */

const nunjucks = require('nunjucks');

function createEnv(path,opts) {
    var
        autoescape = opts.autoescape && true ,//autoescape...
        noCache = opts.noCache || false ,
        watch = opts.watch || false ,
        throwOnUndefined = opts.throwOnUndefined || false ,
        //不是throwOnUnderfined
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path,{
            noCache: noCache,
                watch: watch,
            }),{
            autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
                //卧槽。。。别再拼错了。。。。
            }
        );
    if(opts.filters){
        for(var f in opts.filters){
            env.addFilter(f , opts.filters[f]);
            //大哥。。专心点。。别漏加S
        }
    }
    return env;
}

var env = createEnv('views',{
   watch: true,
    filters: {
       hex: function (n) {
           return '0x' + n.toString(16);
       }
    }
});
/*
 变量env就表示Nunjucks模板引擎对象，
 它有一个render(view, model)方法，
 正好传入view和model两个参数，并返回字符串。
 */

var s = env.render('Nunjucks_Hello.html', { name: '小明' });
console.log(s);