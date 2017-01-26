/**
 * Created by ZY on 2017/1/27.
 */

/*
 要开发HTTP服务器程序，
 从头处理TCP连接，解析HTTP是不现实的。
 这些工作实际上已经由Node.js自带的http模块完成了。应用程序并
 不直接和HTTP协议打交道，
 而是操作http模块提供的request和response对象。
 */
/*
request对象封装了HTTP请求，
我们调用request对象的属性和方法就可以拿到所有HTTP请求的信息；

response对象封装了HTTP响应，
我们操作response对象的方法，就可以把HTTP响应返回给浏览器。
*/
var http = require('http');

var server = http.createServer(function(request,response){
    console.log(request.method +' : '+request.url);
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.end('<h1>Hello world ~<h1>');
});

server.listen(8050);

console.log('Server is running at http://127.0.0.1:8050');