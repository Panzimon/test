/**
 * Created by ZY on 2017/1/29.
 */

const nunjucks = require('nunjucks');

function createEnv(path,opts) {
    var
        autoscape = opts.autoscape && true ,
        noCache = opts.noCache || false ,
        watch = opts.watch || false ,
        throwOnUnderfined = opts.throwOnUndefined || false ,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views',{
            noCache: noCache,
                watch: watch,
            }),{
            autoscape: autoscape,
                throwOnUnderfined: throwOnUnderfined
            }
        );
    if(opts.filters){
        for(var f in opts.filters){
            env.addFilter(f,opts.filter[f]);
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