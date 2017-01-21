/**
 * Created by ZY on 2017/1/21.
 */

//JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。
/*
 在JSON中，一共就这么几种数据类型：

 number：和JavaScript的number完全一致；
 boolean：就是JavaScript的true或false；
 string：就是JavaScript的string；
 null：就是JavaScript的null；
 array：就是JavaScript的Array表示方式——[]；
 object：就是JavaScript的{ ... }表示方式。
 以及上面的任意组合。

 JSON还定死了字符集必须是UTF-8

 JSON的字符串规定必须用双引号""，Object的键也必须用双引号""
 */

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

console.log(JSON.stringify(xiaoming,null,'  '));

