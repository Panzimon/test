/**
 * Created by ZY on 2017/1/30.
 */

var signin = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {
        // 登录成功:
        console.log('signin ok!');
        ctx.render('View-koa_signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {
        // 登录失败:
        console.log('signin failed!');
        ctx.render('View-koa_signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
};

module.exports = {
  'POST /signin': signin
};