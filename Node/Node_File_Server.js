/**
 * Created by ZY on 2017/1/27.
 *//*
var url = require('url');
var path = require('path');
console.log(url.parse(
    'http://user:pass@host.com:8080' +
    '/path/to/file?query=string#hash')
);
var workDir = path.resolve('.');

var filePath = path.join(workDir,'test','index.html');*/
var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');
//=.=我还以为是process.cwd()呢。。
console.log('Static root dir: '+ root);
// 创建服务器:
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8050);

console.log('Server is running at http://127.0.0.1:8050/');

/*
 练习

 在浏览器输入http://localhost:8080/时，
 会返回404，原因是程序识别出HTTP请求的不是文件，而是目录。
 请修改file_server.js，如果遇到请求的路径是目录，
 则自动在目录下依次搜索index.html、default.html，
 如果找到了，就返回HTML文件的内容
//todo 大神答案
 'use strict';

 var fs = require('fs'),
 url = require('url'),
 path = require('path'),
 http = require('http');

 var root = path.resolve(process.argv[2] || '.');

 console.log('Static root dir: ' + root);

 var server = http.createServer(function (request, response) {
 var pathname = url.parse(request.url).pathname;

 var filepath = path.join(root, pathname);

 fs.stat(filepath, function (err, stats) {
 if (!err) {

 if (stats.isFile()) {
 console.log('200' + request.url);

 response.writeHead(200);

 fs.createReadStream(filepath).pipe(response);

 } else if (stats.isDirectory()) {

 let i,defaults = ['index.html', 'default.html'];
 for (i = 0; i < defaults.length; i++) {
 if (fs.existsSync(path.join(filepath, defaults[i]))) {
 filepath = path.join(filepath, defaults[i]);
 console.log('200' + request.url);
 response.writeHead(200);
 fs.createReadStream(filepath).pipe(response);
 return;
 }
 }
 console.log('404' + request.url);
 response.writeHead(404);
 response.end('404 Not Found');

 }
 } else {
 console.log('404' + request.url);
 response.writeHead(404);
 response.end('404 Not Found');

 }

 });
 });

 server.listen(8080);
 console.log('Server is running at http://127.0.0.1:8080/');

 todo 大神答案2
 'use strict';

 var
 fs = require('fs'),
 url = require('url'),
 path = require('path'),
 http = require('http');

 var filenames = ['default.html', 'index.html'];

 var root = path.resolve('.'); // 使用当前目录
 var server = http.createServer(function(request, response) {
 var filename = url.parse(request.url).pathname;
 var filePath = path.join(root, filename);

 fs.stat(filePath, function(err, stat) {
 if (err) {
 console.log('不存在该文件');
 failure(response, '<h2>404 Not Found</h2>');
 } else {
 if (stat.isFile()) {
 console.log('请求的是文件');
 success(response, filePath);
 } else if (stat.isDirectory()) {
 console.log('请求的是目录');
 // 寻找该目录下的 index.html 或者 default.html
 isDir(response, filePath);
 }
 }
 });
 });

 function isDir(response, dir) {
 fs.readdir(dir, (err, files) => {
 if (err) {
 failure(response, '<h1>404 该目录不存在</h1>');
 } else {
 console.log(files);
 var names = files.filter(function (x) {
 return x === 'index.html' || x === 'default.html';
 });
 if (names.length !== 0) {
 success(response, path.join(dir, names[0]));
 } else {
 failure(response, '<h1>404 不存在首页</h1>');
 }
 }
 });
 }

 function success(response, filePath) {
 response.writeHead(200, {'Content-Type': 'text/html'});
 fs.createReadStream(filePath).pipe(response);
 }

 function failure(response, errString) {
 response.writeHead(404, {'Content-Type': 'text/html', 'charset': 'utf-8'});
 response.end(errString);
 }

 server.listen(8080);
 */