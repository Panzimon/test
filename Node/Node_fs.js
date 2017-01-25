/**
 * Created by XYSM on 2017/1/26.
 */
/*
 fs模块就是文件系统模块，负责读写文件。

 和所有其它JavaScript模块不同的是，
 fs模块同时提供了异步和同步的方法
 */

/*
 什么是异步方法。因为JavaScript的单线程模型，
 执行IO操作时，JavaScript代码无需等待，
 而是传入回调函数后，继续执行后续JavaScript代码。
 比如jQuery提供的getJSON()操作：

 $.getJSON('http://example.com/ajax', function (data) {
 console.log('IO结果返回后执行...');
 });
 console.log('不等待IO结果直接执行后续代码...');
 而同步的IO操作则需要等待函数返回：

 // 根据网络耗时，函数将执行几十毫秒~几秒不等:
 var data = getJSONSync('http://example.com/ajax');
 同步操作的好处是代码简单，缺点是程序将等待IO操作，
 在等待时间内，无法响应其它任何事件。而异步读取不用等待IO操作，
 但代码较麻烦。
 */
/*
 按照JavaScript的标准，异步读取一个文本文件的代码如下：
 */
var fs = require('fs');

fs.readFile('sample.txt','utf-8',function (err,data) {
    if(err){
        console.log(err);
    }else {
        console.log(data);
    }
});
/*
 由于err是否为null就是判断是否出错的标志，所以通常的判断逻辑总是：

 if (err) {
 // 出错了
 } else {
 // 正常
 }
 */

/*
读取二进制文件
 */
fs.readFile('sample.png',function(err,data){
    "use strict";
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
        var text = data.toString('utf-8');
        console.log(data.toString('utf-8'));
        var buf = new Buffer(text, 'utf-8');
        console.log(buf);
    }
});

/*
 当读取二进制文件时，
 不传入文件编码时，
 回调函数的data参数将返回一个Buffer对象。
 在Node.js中，Buffer对象就是一个包含零个或任意个字节的数组
 （注意和Array不同）。

 Buffer对象可以和String作转换，
 例如，把一个Buffer对象转换成String：
 或者把一个String转换成Buffer：
 见上

 */

/*
 fs也提供相应的同步读取函数。同步读取的函数和异步函数相比，多了一个Sync后缀，并且不接收回调函数，函数直接返回结果。

 用fs模块同步读取一个文本文件的代码如下：


 */
var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);
/*
 如果同步读取文件发生错误，则需要用try...catch捕获该错误：

 try {
 var data = fs.readFileSync('sample.txt', 'utf-8');
 console.log(data);
 } catch (err) {
 // 出错了
 }

 */

/*
 将数据写入文件是通过fs.writeFile()实现的：

 'use strict';

 */

var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

//writeFile()的参数依次为文件名、
// 数据和回调函数。如果传入的数据是String，
// 默认按UTF-8编码写入文本文件，如果传入的参数是Buffer，
// 则写入的是二进制文件。回调函数由于只关心成功与否，
// 因此只需要一个err参数。

//和readFile()类似，writeFile()也有一个同步方法，
// 叫writeFileSync()：


var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);

//如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，
// 它返回一个Stat对象，能告诉我们文件或目录的详细信息：

fs.stat('sample.txt',function (err,stat) {
    if(err){
        console.log(err);
    }else{
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: '
            + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: '
                + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: '
                + stat.mtime);
        }
    }
});
//stat()也有一个对应的同步函数statSync()，

/*
 由于Node环境执行的JavaScript代码是服务器端代码，
 所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，
 必须使用异步代码，否则，同步代码在执行时期，
 服务器将停止响应，因为JavaScript只有一个执行线程。

 服务器启动时如果需要读取配置文件，
 或者结束时需要写入到状态文件时，
 可以使用同步代码，因为这些代码只在启动和结束时执行一次，
 不影响服务器正常运行时的异步执行。
 */

/*
//todo quesion
 'use strict';

 var fs = require('fs');

 var buf = fs.readFile('sample.txt',
  function (err, data) {
 if (err) {
 console.log(err);
 } else {
 return data;
 }
 });

 console.log(buf instanceof Buffer);
 //这里结果竟然是false?这是怎么回事啊？

//todo answer

 不能这么写, 如果需要使用返回值可以使用同步形式

 console.log(buf instanceof Buffer)
 这里buf不是Buffer应该是undefined.
 因为读取文件是一个异步操作,
 js会等同步操作执行完毕才开始执行异步操作, 所以是false.

 还有就是

 return data;
 这里不能返回到给buf, 因为它是一个回调函数
 */

/*
 writeFile写入的时候会先把文件清空，再写入，有没有方法不清空直接写
 */
/*
 open('file', 'a')
 模式为a意思是append（追加）
 */
/*//todo 使用同步的方法获取文件信息
 //1. 加载fs模块
 var fs = require('fs');

 //2. 指定要访问的文件路径
 var filePath = "sample.txt";
 var dicPath = "testDir";

 var fileInfo;

 fileInfo = fs.statSync(filePath);
 if (fileInfo.isFile()) {
 console.log(fileInfo.isFile() + "是一个文件路径");
 console.log("文件大小：" + fileInfo.size);
 console.log("文件创建时间：" + fileInfo.birthtime);
 console.log("文件最后修改时间: " + fileInfo.mtime);
 } else if (fileInfo.isDirectory()) {
 // 是否是目录:
 console.log(fileInfo.isFile() + "是一个文件夹路径");
 console.log("文件夹大小：" + fileInfo.size);
 console.log("文件夹创建时间：" + fileInfo.birthtime);
 console.log("文件夹最后修改时间: " + fileInfo.mtime);
 } else {
 console.log("输入的路径不是文件也不是文件夹");
 }

 fileInfo = fs.statSync(dicPath);
 if (fileInfo.isFile()) {
 console.log(fileInfo.isFile() + "是一个文件路径");
 console.log("文件大小：" + fileInfo.size);
 console.log("文件创建时间：" + fileInfo.birthtime);
 console.log("文件最后修改时间: " + fileInfo.mtime);
 } else if (fileInfo.isDirectory()) {
 // 是否是目录:
 console.log(fileInfo.isFile() + "是一个文件夹路径");
 console.log("文件夹大小：" + fileInfo.size);
 console.log("文件夹创建时间：" + fileInfo.birthtime);
 console.log("文件夹最后修改时间: " + fileInfo.mtime);
 } else {
 console.log("输入的路径不是文件也不是文件夹");
 }
 */