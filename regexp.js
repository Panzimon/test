/**
 * Created by ZY on 2017/1/20.
 */
/*
 '\d\d\d'可以匹配'010'；

 '\w\w'可以匹配'js'；

 .可以匹配任意字符，所以：

 'js.'可以匹配'jsp'、'jss'、'js!'等等。

 \d{3}\s+\d{3,8}

 \d{3}\-\d{3,8}
 */
/*
 [0-9a-zA-Z\_]+可以匹配至少一个数字、字母或者下划线
 [0-9a-zA-Z\_]+可以匹配至少一个数字、字母或者下划线
 [a-zA-Z\_\$][0-9a-zA-Z\_\$]*可以匹配由字母或下划线、$开头，
 后接任意个由一个数字、字母或者下划线、$组成的字符串，
 也就是JavaScript允许的变量名
 (J|j)ava(S|s)cript
 可以匹配'JavaScript'、'Javascript'、'javaScript'或者'javascript'

 ^表示行的开头，^\d表示必须以数字开头。

 $表示行的结束，\d$表示必须以数字结束。

 你可能注意到了，js也可以匹配'jsp'，
 但是加上^js$就变成了整行匹配，就只能匹配'js'了
 */

// JavaScript有两种方式创建一个正则表达式：
// 第一种方式是直接通过/正则表达式/写出来，
// 第二种方式是通过new RegExp('正则表达式')创建一个RegExp对象。

var re1 = /pan\-0113/;
console.log(re1);

var re2 = new RegExp('ABC\\-001');
console.log(re2);

console.log(re1.test('pan-0113'));//test('pan\-0113')也是true

var re = /^\d{3}-\d{3,8}$/;//
// 要匹配010\\-12345的话，
// /^\d{3}\\-\d{3,8}$/

// why...
console.log(re.test('010-12345')); // true
console.log(re.test('010\-12345')); // true
console.log(re.test('010-1234x')); // false
console.log(re.test('010 12345')); // false