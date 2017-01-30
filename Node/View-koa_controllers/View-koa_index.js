/**
 * Created by ZY on 2017/1/30.
 */

var index = async (ctx,next)=>{
    "use strict";
    ctx.render('View-koa_index.html',{
        title: 'Welcome'
    });
};

module.exports = {
    'GET /': index
};