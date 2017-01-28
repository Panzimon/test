/**
 * Created by ZY on 2017/1/28.
 */
var express = require('express');
var app = express();

app.get('/',function (req,res) {
    res.send('Hello World ! ');
});

app.listen(8050,function () {
    console.log('Example app listening on port 8050 ~');
});

/*
 虽然Express的API很简单，但是它是基于ES5的语法，要实现异步代码，
 只有一个方法：回调。如果异步嵌套层次过多，代码写起来就非常难看
 */

app.get('/test',function(req,res){
    "use strict";
   fs.readFile('file1',function (err,data) {
       if(err){
           res.status(500).send('read file1 error');
       }
       fs.readFile('/file2',function(err,data){
           if(err){
               res.status(500).send('read file2 error');
           }
           res.type('text/plain');
           res.send(data);
       });
   });
});
//虽然可以用async这样的库来组织异步代码，
// 但是用回调写异步实在是太痛苦了！
// p.s.其实我觉得还好=。=

/*
 Express的团队又基于ES6的generator重新编写了下一代web框架koa。
 和Express相比，koa 1.0使用generator实现异步，代码看起来像同步的
 */

/*
 npm install koa -g
 C:\Users\**\AppData\Roaming\npm
 `-- koa@1.2.4
 +-- accepts@1.3.3
 | `-- negotiator@0.6.1
 +-- co@4.6.0
 +-- composition@2.3.0
 | `-- any-promise@1.3.0
 +-- content-disposition@0.5.2
 +-- content-type@1.0.2
 +-- cookies@0.6.2
 | +-- depd@1.1.0
 | `-- keygrip@1.0.1
 +-- debug@2.6.0
 | `-- ms@0.7.2
 +-- delegates@1.0.0
 +-- destroy@1.0.4
 +-- error-inject@1.0.0
 +-- escape-html@1.0.3
 +-- fresh@0.3.0
 +-- http-assert@1.2.0
 | +-- deep-equal@1.0.1
 | `-- http-errors@1.4.0
 |   `-- inherits@2.0.1
 +-- http-errors@1.5.1
 | +-- inherits@2.0.3
 | `-- setprototypeof@1.0.2
 +-- koa-compose@2.5.1
 +-- koa-is-json@1.0.0
 +-- mime-types@2.1.14
 | `-- mime-db@1.26.0
 +-- on-finished@2.3.0
 | `-- ee-first@1.1.1
 +-- only@0.0.2
 +-- parseurl@1.3.1
 +-- statuses@1.3.1
 +-- type-is@1.6.14
 | `-- media-typer@0.3.0
 `-- vary@1.1.0

 */

const koa = require('koa'),
    app = koa();

app.use('/test',function* () {
   yield doReadFile1();
   var data = yield doReadFile2();
   this.body = data;
});

app.listen(3000);