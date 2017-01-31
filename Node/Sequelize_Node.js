/**
 * Created by ZY on 2017/1/31.
 */

/*
 如果直接使用mysql包提供的接口，
 我们编写的代码就比较底层，例如，查询代码：

 connection.query('SELECT * FROM users WHERE id = ?',
 ['123'], function(err, rows) {
 if (err) {
 // error
 } else {
 for (let row in rows) {
 processRow(row);
 }
 }
 });
 就跟那个Java一样嘛-。-
 */

/*
 每一行可以用一个JavaScript对象表示，例如第一行：

 {
 "id": 1,
 "name": "Gaffey",
 "birth": "2007-07-07"
 }
 这就是传说中的ORM技术：
 Object-Relational Mapping，把关系数据库的表结构映射到对象上。
 */

/*
 ORM框架Sequelize
 这样，我们读写的都是JavaScript对象，
 Sequelize帮我们把对象变成数据库中的行
 */
/*
 用Sequelize查询pets表，代码像这样：

 Pet.findAll()
 .then(function (pets) {
 for (let pet in pets) {
 console.log(`${pet.id}: ${pet.name}`);
 }
 }).catch(function (err) {
 // error
 });
 */

/*
 因为Sequelize返回的对象是Promise，
 所以我们可以用then()和catch()分别异步响应成功和失败。

 但是用then()和catch()仍然比较麻烦。
 有没有更简单的方法呢？

 可以用ES7的await来调用任何一个Promise对象，
 这样我们写出来的代码就变成了：

 var pets = await Pet.findAll();
 真的就是这么简单！

 await只有一个限制，就是必须在async函数中调用。
 上面的代码直接运行还差一点，我们可以改成：

 (async () => {
 var pets = await Pet.findAll();
 })();

 考虑到koa的处理函数都是async函数，
 所以我们实际上将来在koa的async函数中直接写await访问数据库就可以了！

 这也是为什么我们选择Sequelize的原因：
 只要API返回Promise，就可以用await调用，写代码就非常简单！
 */

/*
 test数据库是MySQL安装后自动创建的用于测试的数据库。
 在MySQL命令行执行下列命令：

 grant all privileges on test.* to 'www'@'%' identified by 'www';

 use test;

 create table pets (
 id varchar(50) not null,
 name varchar(100) not null,
 gender boolean not null,
 birth varchar(10) not null,
 createdAt bigint not null,
 updatedAt bigint not null,
 version bigint not null,
 primary key (id)
 ) engine=innodb;
 */
/*
 第一条grant命令是创建MySQL的用户名和口令，
 均为www，并赋予操作test数据库的所有权限
 */

