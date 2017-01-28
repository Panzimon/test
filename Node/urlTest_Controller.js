/**
 * Created by ZY on 2017/1/29.
 */
'use strict';
const fs = require('fs');
// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}
/*
 我来解释下 首先，相关知识 NODE模块和 JS对象语法，
 mapping 是个对象 但为什么要用mapping[url] 而不是 mapping.url
 因为 这个对象的 属性名 是个字符串 即 'GET /'

 教程 “对象”章讲过

 var xiaohong = {
 name: '小红',
 'middle-school': 'No.1 Middle School'
 };

 xiaohong的属性名middle-school不是一个有效的变量，
 就需要用''括起来。访问这个属性也无法使用.操作符，
 必须用['xxx']来访问：

 xiaohong['middle-school']; // 'No.1 Middle School'
 xiaohong['name']; // '小红'
 xiaohong.name; // '小红'

 所以 我们需要 使用mapping[url] 来获取属性的值
 */
module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};