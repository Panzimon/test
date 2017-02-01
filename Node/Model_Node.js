/**
 * Created by XYSM on 2017/2/1.
 */
/*
 直接使用Sequelize虽然可以，但是存在一些问题。

 团队开发时，有人喜欢自己加timestamp：
 */
/*
 有人又喜欢自增主键，并且自定义表名：

 var Pet = sequelize.define('pet', {
 id: {
 type: Sequelize.INTEGER,
 autoIncrement: true,
 primaryKey: true
 },
 name: Sequelize.STRING(100)
 }, {
 tableName: 't_pet'
 });
 */
/*
 一个大型Web App通常都有几十个映射表，一个映射表就是一个Model。
 如果按照各自喜好，那业务代码就不好写。
 Model不统一，很多代码也无法复用。

 所以我们需要一个统一的模型，强迫所有Model都遵守同一个规范，
 这样不但实现简单，而且容易统一风格。
 */
/*
 我们首先要定义的就是Model存放的文件夹必须在models内，
 并且以Model名字命名，例如：Pet.js，User.js等等。

 其次，每个Model必须遵守一套规范：

 统一主键，名称必须是id，类型必须是STRING(50)；
 主键可以自己指定，也可以由框架自动生成
 （如果为null或undefined）；
 所有字段默认为NOT NULL，除非显式指定；
 统一timestamp机制，
 每个Model必须有createdAt、updatedAt和version，
 分别记录创建时间、修改时间和版本号。
 其中，createdAt和updatedAt以BIGINT存储时间戳，
 最大的好处是无需处理时区，排序方便。version每次修改时自增。
 所以，我们不要直接使用Sequelize的API，
 而是通过db.js间接地定义Model
 */
/*
 例如，User.js应该定义如下：

 const db = require('../db');

 module.exports = db.defineModel('users', {
 email: {
 type: db.STRING(100),
 unique: true
 },
 passwd: db.STRING(100),
 name: db.STRING(100),
 gender: db.BOOLEAN
 });
 这样，User就具有email、passwd、name和gender这4个业务字段。
 id、createdAt、updatedAt和version应该自动加上，
 而不是每个Model都去重复定义
 */
//db.js的作用就是统一Model的定义：
/*
 接下来，我们把简单的config.js拆成3个配置文件：

 config-default.js：存储默认的配置；
 config-override.js：存储特定的配置；
 config-test.js：存储用于测试的配置。
 */
/*
 具体的规则是：

 先读取config-default.js；

 如果不是测试环境，就读取config-override.js，
 如果文件不存在，就忽略。

 如果是测试环境，就读取config-test.js。
 */

/*
 一旦Model多了起来，如何引用也是一件麻烦事。

 自动化永远比手工做效率高，而且更可靠
 */

/*
=工程结构

 最终，我们创建的工程model-sequelize结构如下：

 model-sequelize/
 |
 +- .vscode/
 |  |
 |  +- launch.json <-- VSCode 配置文件
 |
 +- models/ <-- 存放所有Model
 |  |
 |  +- Pet.js <-- Pet
 |  |
 |  +- User.js <-- User
 |
 +- config.js <-- 配置文件入口
 |
 +- config-default.js <-- 默认配置文件
 |
 +- config-test.js <-- 测试配置文件
 |
 +- db.js <-- 如何定义Model
 |
 +- model.js <-- 如何导入Model
 |
 +- init-db.js <-- 初始化数据库
 |
 +- app.js <-- 业务代码
 |
 +- start.js <-- 启动入口js
 |
 +- package.json <-- 项目描述文件
 |
 +- node_modules/ <-- npm安装的所有依赖包
 */