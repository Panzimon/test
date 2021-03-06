/**
 * Created by XYSM on 2017/1/26.
 */
var fs =require( 'fs');
var rs = fs.createReadStream('sample.txt','utf-8');
rs.on('data', function (chunk) {
    console.log('DATA 1:')
    console.log(chunk);
});


rs.on('data', function (chunk) {
    console.log('DATA 2:')
    console.log(chunk);
});
rs.on('end',function () {
    console.log('end.');
});
rs.on('error',function (err) {
    console.log('error!!!: '+err);
});
//p.s.注意，data事件可能会有多次，每次传递的chunk是流的一部分数据。

//要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束：

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();
//所有可以读取数据的流都继承自stream.Readable，
// 所有可以写入的流都继承自stream.Writable

/*
 两个流也可以串起来。一个Readable流和一个Writable流串起来后，
 所有的数据自动从Readable流进入Writable流，这种操作叫pipe
 */

/*
 Readable流有一个pipe()方法，就是用来干这件事的
 pipe()把一个文件流和另一个文件流串起来，
 这样源文件的所有数据就自动写入到目标文件里了，
 所以，这实际上是一个复制文件的程序：
 */

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);


/*
 默认情况下，当Readable流的数据读取完毕，
 end事件触发后，将自动关闭Writable流。
 如果我们不希望自动关闭Writable流，需要传入参数：

 readable.pipe(writable, { end: false });
 */