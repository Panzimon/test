/**
 * Created by XYSM on 2017/2/1.
 */

require('babel-core/register')({
    presets: ['stage-3']
});

const model = require('./model.js');
model.sync().then(() => {
    console.log('Init database OK!');
    process.exit(0);
}).catch((e) => {
    console.log(e);
});
/*
model.sync();

console.log('init db ok.');
process.exit(0);
*/
//process.exit(0);会提早结束代码。导致表未创建，程序就结束。
// 所以屏蔽了process.exit(0);表结构创建成功了，
// 但是我要如何获取module.sync()的执行成功，
// 来再次执行process.exit(0)，来终止进程呢？
/*
 返回的是Promise，then()和catch()里写回调代码。
 初始化数据库的代码单独运行一次就行了，需要process.exit()吗

 将在db.sync中return sequelize.sync()

 在model.sync中return db.sync()

 这样就可以：

 model.sync().then(() => {
 console.log('Init database OK!')
 process.exit(0)
 }).catch((e) => {
 console.log(e)
 })
 */