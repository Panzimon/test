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