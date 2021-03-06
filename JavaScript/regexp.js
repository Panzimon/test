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


var a = 'a b  c'.split(' ');//attention the space between b&c
// 无法识别连续的空格
console.log(a);

var aaa = 'a b   c'.split(/\s+/);
console.log(aaa);

var aa = 'a,b, c;;;  d'.split(/[\s\,\;]+/);
console.log(aa);

var re = /^(\d{3})-(\d{3,8})$/;
console.log(re.exec('010-12345')); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null


var reg;
reg = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;

var reh = /^(\d+)(0*)$/;
reh.exec('102300'); // ['102300', '102300', '']
/*
 *表示任意个字符（包括0个），用+表示至少一个字符，
 * 用?表示0个或1个字符，用{n}表示n个字符，
 * 用{n,m}表示n-m个字符
 */

var re3 = /^(\d+?)(0*)$/;
re3.exec('102300'); // ['102300', '1023', '00']

var r1 = /test/g;
// 等价于:
var r2 = new RegExp('test', 'g');

//全局匹配可以多次执行exec()方法来搜索一个匹配的字符串。
// 当我们指定g标志后，每次运行exec()，
// 正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引

var s;
s = 'JavaScript, VBScript, JScript and ECMAScript';
var re4;
re4 = /[a-zA-Z]+Script/g;

 re4.exec(s);
    console.log(re4.lastIndex);
re4.exec(s);
console.log(re4.lastIndex);
re4.exec(s);
console.log(re4.lastIndex);
re4.exec(s);
console.log(re4.lastIndex);
re4.exec(s);
console.log(re4.lastIndex);

//全局匹配类似搜索，因此不能使用/^...$/，那样只会最多匹配一次。
// 正则表达式还可以指定i标志，
// 表示忽略大小写，m标志，表示执行多行匹配。

/*
 <html>
 <head>
 <script type="text/javascript">
 //正则替换链接，链接有换行
 function t1(){
 var con = document.getElementsByName('content')[0].value;//内容里有<a href="">.....</a>，但是有换行
 var reg = /<a[\s]+[\d\D]*<\/a>/g;//采用[\d\D]或[\w\W]或[\s\S]来解决不能换行问题
 alert(con.replace(reg,'----'));
 }
 //正则把每一行的结尾数字，换成#号---多行模式，添加/m(每行当作结尾)和/g(全局匹配)模式增强符
 function t2(){
 var con = document.getElementsByName('content')[0].value;//写几行文字，每行以数字结尾
 var reg = /\d+$/gm;
 alert(con.replace(reg,'#'));
 }
 </script>
 </head>
 <body>
 <textarea rows="5" cols="30" name="content"></textarea><br />
 <button onclick="t1();">正则替换链接(需要考虑换行情况)</button><br />
 <button onclick="t2();">正则多行替换</button><br />
 </body>
 </html>
 */

/*
 请尝试写一个验证Email地址的正则表达式。版本一应该可以验证出类似的Email：

 'use strict';

 var re = /^[\w.]+@[\w.]+\.\w+$/;
//我的版本↑
 // 测试:
 var
 i,
 success = true,
 should_pass = ['someone@gmail.com', 'bill.gates@microsoft.com', 'tom@voyager.org', 'bob2015@163.com'],
 should_fail = ['test#gmail.com', 'bill@microsoft', 'bill%gates@ms.com', '@voyager.org'];
 for (i = 0; i < should_pass.length; i++) {
 if (!re.test(should_pass[i])) {
 alert('测试失败: ' + should_pass[i]);
 success = false;
 break;
 }
 }
 for (i = 0; i < should_fail.length; i++) {
 if (re.test(should_fail[i])) {
 alert('测试失败: ' + should_fail[i]);
 success = false;
 break;
 }
 }
 if (success) {
 alert('测试通过!');
 }
 */

/*
 版本二可以验证并提取出带名字的Email地址：

 'use strict';

 var re = /^\<(\w+\s+\w+)\>\s+([\w.]+@[\w.]+\.\w+)$/g;
=。=坑爹，忘记了把两个尖叫括号括在外面。。。
 // 测试:
 var r = re.exec('<Tom Paris> tom@voyager.org');
 if (r === null || r.toString() !== ['<Tom Paris> tom@voyager.org', 'Tom Paris', 'tom@voyager.org'].toString()) {
 alert('测试失败!');
 }
 else {
 alert('测试成功!');
 }
 */
