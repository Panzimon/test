/**
 * Created by ZY on 2017/1/28.
 */

/*
 除了重量级的软件如Office，Photoshop等，大部分软件都以Web形式提供。
 比如，新浪提供的新闻、博客、微博等服务，均是Web应用
 */

/*
 Web应用开发可以说是目前软件开发中最重要的部分。
 Web开发也经历了好几个阶段：

 静态Web页面：
 由文本编辑器直接编辑并生成静态的HTML页面，
 如果要修改Web页面的内容，就需要再次编辑HTML源文件，
 早期的互联网Web页面就是静态的；

 CGI：
 由于静态Web页面无法与用户交互，
 比如用户填写了一个注册表单，
 静态Web页面就无法处理。
 要处理用户发送的动态数据，
 出现了Common Gateway Interface，简称CGI，用C/C++编写。

 ASP/JSP/PHP：
 由于Web应用特点是修改频繁，
 用C/C++这样的低级语言非常不适合Web开发，
 而脚本语言由于开发效率高，与HTML结合紧密，
 因此，迅速取代了CGI模式。
 ASP是微软推出的用VBScript脚本编程的Web开发技术，
 而JSP用Java来编写脚本，PHP本身则是开源的脚本语言。

 MVC：
 为了解决直接用脚本语言嵌入HTML导致的可维护性差的问题，
 Web应用也引入了Model-View-Controller的模式，
 来简化Web开发。ASP发展为ASP.Net，JSP和PHP也有一大堆MVC框架。

 目前，
 Web开发技术仍在快速发展中，
 异步开发、新的MVVM前端技术层出不穷。
 */

/*用Node.js开发Web服务器端，有几个显著的优势：

 一是后端语言也是JavaScript，
 以前掌握了前端JavaScript的开发人员，现在可以同时编写后端代码；

 二是前后端统一使用JavaScript，
 就没有切换语言的障碍了；

 三是速度快，非常快！
 这得益于Node.js天生是异步的。
 */

/*
 无数种Web框架、ORM框架、模版引擎、测试框架、
 自动化构建工具，数量之多，
 即使是JavaScript老司机，也不免眼花缭乱。

 常见的Web框架包括：
 Express，Sails.js，
 koa，Meteor，DerbyJS，Total.js，restify……

 ORM框架比Web框架要少一些：
 Sequelize，ORM2，Bookshelf.js，Objection.js……

 模版引擎PK：
 Jade，EJS，Swig，Nunjucks，doT.js……

 测试框架包括：
 Mocha，Expresso，Unit.js，Karma……

 构建工具有：
 Grunt，Gulp，Webpack……

 目前，
 在npm上已发布的开源Node.js模块数量超过了30万个
 */