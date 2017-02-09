/**
 * Created by ZY on 2017/2/8.
 */
// index:

module.exports = {
    'GET /': async (ctx, next) => {
        let user = ctx.state.user;
        if (user) {
            ctx.render('Websocket-room.html', {
                user: user
            });
        } else {
            ctx.response.redirect('/signin');
        }
    }
};