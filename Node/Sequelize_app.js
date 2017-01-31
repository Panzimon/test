/**
 * Created by ZY on 2017/1/31.
 */
const Sequelize = require('sequelize'),
    config = require('./config');

console.log('init sequelize...');
//第一步，创建一个sequelize对象实例：
var sequelize = new Sequelize(config.database, config.username,
config.password, {
    host: config.host,
        dialect: 'mysql',
        pool: {
        max: 5,
            min: 0,
            idle: 3000
        }
    });

//第二步，定义模型Pet，告诉Sequelize如何映射数据库表：
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

/*
 sequelize.define()定义Model时，
 传入名称pet，默认的表名就是pets。
 第二个参数指定列名和数据类型，
 如果是主键，需要更详细地指定。
 第三个参数是额外的配置，
 我们传入{ timestamps: false }
 是为了关闭Sequelize的自动添加timestamp的功能。
 所有的ORM框架都有一种很不好的风气，
 总是自作聪明地加上所谓“自动化”的功能
 */
/*
//用Promise的方式加数据
var now = Date.now();

Pet.create(
    {
        id: 'g-' + now,
        name: 'Gaffey',
        gender: false,
        birth: '2017-01-31',
        createdAt: now,
        updatedAt: now,
        version: 0
    }
).then(function (p) {
    console.log('created. '+ JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: '+ err);
});*/
//用async await：加数据
(async ()=>{
    "use strict";
    let dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();
/*
查询数据:
 */
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++;
        await p.save();
        if (p.version === 3) {
            await p.destroy();
            console.log(`${p.name} was destroyed.`);
        }
    }
})();
/*
 如果要更新数据，可以对查询到的实例调用save()方法：

 (async () => {
 var p = await queryFromSomewhere();
 p.gender = true;
 p.updatedAt = Date.now();
 p.version ++;
 await p.save();
 })();
 */

/*
 如果要删除数据，可以对查询到的实例调用destroy()方法：

 (async () => {
 var p = await queryFromSomewhere();
 await p.destroy();
 })();
 */

/*
 运行代码，可以看到Sequelize打印出的每一个SQL语句，便于我们查看：

 Executing (default):
 INSERT INTO `pets`
 (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`)
 VALUES ('g-1471961204219',
 'Gaffey',false,'2007-07-07',1471961204219,1471961204219,0);
 */

/*
 我们把通过sequelize.define()返回的Pet称为Model，
 它表示一个数据模型。

 所以，使用Sequelize操作数据库的一般步骤就是：

 首先，通过某个Model对象的findAll()方法获取实例；

 如果要更新实例，先对实例属性赋新值，再调用save()方法；

 如果要删除实例，直接调用destroy()方法。

 注意findAll()方法可以接收where、order这些参数，
 这和将要生成的SQL语句是对应的。
 */

/*

运行结果：

 init sequelize...
 (node:12636) DeprecationWarning: `DEBUG_FD` is deprecated. Override `debug.log` if you want to use a different log function (https://git.io/vMUyr)
 Executing (default): SELECT `id`, `name`, `gender`, `birth`, `createdAt`, `updatedAt`, `version` FROM `pets` AS `pet` WHERE `pet`.`name` = 'Gaffey';
 find 0 pets:

 */