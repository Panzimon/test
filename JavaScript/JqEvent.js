/**
 * Created by XYSM on 2017/1/24.
 */
/*
 var a = $('#test-link');
 a.on('click', function () {
 alert('Hello!');
 });
 */
/*
 另一种更简化的写法是直接调用click()方法：

 a.click(function () {
 alert('Hello!');
 });
 两者完全等价。我们通常用后面的写法。
 */

/*
 鼠标事件

 click: 鼠标单击时触发；
 dblclick：鼠标双击时触发；
 mouseenter：鼠标进入时触发；
 mouseleave：鼠标移出时触发；
 mousemove：鼠标在DOM内部移动时触发；
 hover：鼠标进入和退出时触发两个函数，
 相当于mouseenter加上mouseleave。

 键盘事件

 键盘事件仅作用在当前焦点的DOM上，通常是<input>和<textarea>。

 keydown：键盘按下时触发；
 keyup：键盘松开时触发；
 keypress：按一次键后触发。

 其他事件

 focus：当DOM获得焦点时触发；
 blur：当DOM失去焦点时触发；
 change：当<input>、<select>或<textarea>的内容改变时触发；
 submit：当<form>提交时触发；
 ready：当页面被载入并且DOM树完成初始化后触发。

 其中，ready仅作用于document对象。
 由于ready事件在DOM完成初始化后触发，
 且只触发一次，所以非常适合用来写其他的初始化代码。
 假设我们想给一个<form>表单绑定submit事件，
 下面的代码没有预期的效果：

 <html>
 <head>
 <script>
 // 代码有误:
 $('#testForm).on('submit', function () {
 alert('submit!');
 });
 </script>
 </head>
 <body>
 <form id="testForm">
 ...
 </form>
 </body>
 因为JavaScript在此执行的时候，<form>尚未载入浏览器，
 所以$('#testForm)返回[]，并没有绑定事件到任何DOM上。

 所以我们自己的初始化代码必须放到document对象的ready事件中，
 保证DOM已完成初始化：

 <html>
 <head>
 <script>
 $(document).on('ready', function () {
 $('#testForm).on('submit', function () {
 alert('submit!');
 });
 });
 </script>
 </head>
 <body>
 <form id="testForm">
 ...
 </form>
 </body>
 这样写就没有问题了。因为相关代码会在DOM树初始化后再执行。

 由于ready事件使用非常普遍，所以可以这样简化：

 $(document).ready(function () {
 // on('submit', function)也可以简化:
 $('#testForm).submit(function () {
 alert('submit!');
 });
 });
 甚至还可以再简化为：

 $(function () {
 // init...
 });
 */
/*
 上面的这种写法最为常见。如果你遇到$(function () {...})的形式，
 牢记这是document对象的ready事件处理函数。
 */