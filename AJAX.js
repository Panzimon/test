/**
 * Created by XYSM on 2017/1/23.
 */
//Asynchronous JavaScript and XML，
// 意思就是用JavaScript执行异步网络请求.

/*
 如果要让用户留在当前页面中，
 同时发出新的HTTP请求，
 就必须用JavaScript发送这个新请求，
 接收到数据后，再用JavaScript更新页面，这样一来，
 用户就感觉自己仍然停留在当前页面，但是数据却可以不断地更新
 */
/*
 * 用JavaScript写一个完整的AJAX代码并不复杂，但是需要注意：
 * AJAX请求是异步执行的，也就是说，要通过回调函数获得响应
 */

/*
 在现代浏览器上写AJAX主要依靠XMLHttpRequest对象：


For example
 function success(text) {
 var textarea = document.getElementById('test-response-text');
 textarea.value = text;
 }

 function fail(code) {
 var textarea = document.getElementById('test-response-text');
 textarea.value = 'Error code: ' + code;
 }

 var request = new XMLHttpRequest();
 // 新建XMLHttpRequest对象

 request.onreadystatechange = function () {
 // 状态发生变化时，函数被回调
 if (request.readyState === 4) { // 成功完成
 // 判断响应结果:
 if (request.status === 200) {
 // 成功，通过responseText拿到响应的文本:
 return success(request.responseText);
 } else {
 // 失败，根据响应码判断失败原因:
 return fail(request.status);
 }
 } else {
 // HTTP请求还在继续...
 }
 }

 // 发送请求:
 request.open('GET', '/api/categories');
 request.send();

 alert('请求已发送，请等待响应...');
 */

/*
 对于低版本的IE，需要换一个ActiveXObject对象：
 变成这样
 var request = new ActiveXObject('Microsoft.XMLHTTP');
 // 新建Microsoft.XMLHTTP对象

 or
 var request;
 if (window.XMLHttpRequest) {
 request = new XMLHttpRequest();
 } else {
 request = new ActiveXObject('Microsoft.XMLHTTP');
 }

 */
/*
 XMLHttpRequest对象的open()方法有3个参数，
 第一个参数指定是GET还是POST，第二个参数指定URL地址，
 第三个参数指定是否使用异步，默认是true，所以不用写

 注意，千万不要把第三个参数指定为false，
 否则浏览器将停止响应，直到AJAX请求完成。
 如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态


 最后调用send()方法才真正发送请求。GET请求不需要参数，
 POST请求需要把body部分以字符串或者FormData对象传进去
 */