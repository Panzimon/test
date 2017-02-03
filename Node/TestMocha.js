/**
 * Created by XYSM on 2017/2/3.
 */
/*
 assert模块非常简单，
 它断言一个表达式为true。如果断言失败，就抛出Error。
 */
/*
 单独写一个test.js的缺点是没法自动运行测试，
 而且，如果第一个assert报错，
 后面的测试也执行不了了。

 如果有很多测试需要运行，
 就必须把这些测试全部组织起来，然后统一执行，
 并且得到执行结果。这就是我们为什么要用mocha来编写并运行测试。
 */
/*
 如果一个模块在运行的时候并不需要，
 仅仅在开发时才需要，就可以放到devDependencies中。
 这样，正式打包发布时，devDependencies的包不会被包含进来。

 p.s. json没有注释这玩意儿。。。
 */

/*
 注意，很多文章会让你用命令
 npm install -g mocha
 把mocha安装到全局module中。这是不需要的。
 尽量不要安装全局模块，因为全局模块会影响到所有Node.js的工程。
 */
/*
 方法一，可以打开命令提示符，切换到hello-test目录，然后执行命令：

 C:\...\hello-test> node_modules\mocha\bin\mocha
 mocha就会自动执行所有测试，然后输出如下：

 #hello.js
 #sum()
 ✓ sum() should return 0
 ✓ sum(1) should return 1
 ✓ sum(1, 2) should return 3
 ✓ sum(1, 2, 3) should return 6
 4 passing (7ms)
 这说明我们编写的4个测试全部通过。如果没有通过，
 要么修改测试代码，要么修改hello.js，直到测试全部通过为止。
 */
//方法一gg。。。
// mageji。。。唉，删掉抹茶重新npm install才可以。。
/*
 想要3.0.2以上的3.x新版本的话可以改配置为

 "mocha": "^3.0.2"
 */
