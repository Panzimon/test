/**
 * Created by ZY on 2017/2/10.
 */

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('REST_index.html');
    }
};