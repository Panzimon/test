/**
 * Created by XYSM on 2017/1/22.
 */
//从IE10开始支持ES6标准
//Apple的Mac系统自带的基于Webkit内核的浏览器，
// 从OS X 10.7 Lion自带的6.1版本开始支持ES6，
// 目前最新的OS X 10.11 El Capitan自带的Safari版本是9.x，
// 早已支持ES6

/*
 iOS和Android两大阵营分别主要使用Apple的Safari和Google的Chrome，
 由于两者都是Webkit核心，结果HTML5首先在手机上全面普及（桌面绝对是
 Microsoft拖了后腿），对JavaScript的标准支持也很好，
 最新版本均支持ES6
 */

/*
window对象有innerWidth和innerHeight属性
可以获取浏览器窗口的内部宽度与高度
内部宽高：
除去菜单栏、工具栏、边框等占位元素
网页净宽高

 还有一个outerWidth和outerHeight属性，可以获取浏览器窗口的整个宽高。
 p.s.Ie<=8不支持
 */
/*
 navigator.appName：浏览器名称；
 navigator.appVersion：浏览器版本；
 navigator.language：浏览器设置的语言；
 navigator.platform：操作系统类型；
 navigator.userAgent：浏览器设定的User-Agent字符串。
 */

/*
 navigator的信息可以很容易地被用户修改，
 所以JavaScript读取的值不一定是正确的。

 var width;
 if (getIEVersion(navigator.userAgent) < 9) {
 width = document.body.clientWidth;
 } else {
 width = window.innerWidth;
 }
 但这样既可能判断不准确，也很难维护代码。
 正确的方法是充分利用JavaScript对不存在属性返回undefined的特性，
 直接用短路运算符||计算：

 var width = window.innerWidth || document.body.clientWidth;

 screen对象表示屏幕的信息，常用的属性有：

 screen.width：屏幕宽度，以像素为单位；
 screen.height：屏幕高度，以像素为单位；
 screen.colorDepth：返回颜色位数，如8、16、24。
 */
/*
 location对象表示当前页面的URL信息。例如，一个完整的URL：

 http://www.example.com:8080/path/index.html?a=1&b=2#TOP
 可以用location.href获取。要获得URL各个部分的值，可以这么写：

 location.protocol; // 'http'
 location.host; // 'www.example.com'
 location.port; // '8080'
 location.pathname; // '/path/index.html'
 location.search; // '?a=1&b=2'
 location.hash; // 'TOP'
 要加载一个新页面，可以调用location.assign()。如果要重新加载当前页面，调用location.reload()方法非常方便。

 'use strict';

 if (confirm('重新加载当前页' + location.href + '?')) {
 location.reload();
 } else {
 location.assign('/discuss'); // 设置一个新的URL地址
 }

 */
/*
 document对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，
 document对象就是整个DOM树的根节点

 document的title属性是从HTML文档中的<title>xxx</title>读取的，
 但是可以动态改变
 */
/*
 getElementById()和getElementsByTagName()
 可以按ID获得一个DOM节点和按Tag名称获得一组DOM节点

 var menu = document.getElementById('drink-menu');
 var drinks = document.getElementsByTagName('dt');

 menu = document.getElementById('drink-menu');
 menu.tagName;

 服务器在设置Cookie时可以使用httpOnly，
 设定了httpOnly的Cookie将不能被JavaScript读取。
 这个行为由浏览器实现，
 主流浏览器均支持httpOnly选项，IE从IE6 SP1开始支持
 */

