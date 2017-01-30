/**
 * Created by ZY on 2017/1/30.
 */

const path = require('path'),
    mime = require('mime'),
    fs = require('mz/fs');

// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles (url,dir) {
    return async (ctx,next)=>{
        "use strict";
        let rpath = ctx.request.path;
        if (rpath.startsWith(url)){
            let fp = path.join(dir,rpath.substring(url.length));
            if(await fs.exists(fp)){
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            }
        }else{
            await next();
        }
    };
}

module.exports = staticFiles ;
/*
 mz提供的API和Node.js的fs模块完全相同，但fs模块使用回调，
 而mz封装了fs对应的函数，并改为Promise。
 这样，我们就可以非常简单的用await调用mz的函数，而不需要任何回调。
 */
