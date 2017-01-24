/**
 * Created by XYSM on 2017/1/25.
 */

/*
 错误分两种，一种是程序写的逻辑不对，导致代码执行异常。例如：

 var s = null;
 var len = s.length; // TypeError：null变量没有length属性
 对于这种错误，要修复程序。

 一种是执行过程中，程序可能遇到无法预测的异常情况而报错，
 例如，网络连接中断，读取不存在的文件，没有操作权限等。

 对于这种错误，我们需要处理它，并可能需要给用户反馈。
 */

/*

 错误处理是程序设计时必须要考虑的问题。
 对于C这样贴近系统底层的语言，错误是通过错误码返回的：

 int fd = open("/path/to/file", O_RDONLY);
 if (fd == -1) {
 printf("Error when open file!");
 } else {
 // TODO
 }
 通过错误码返回错误，就需要约定什么是正确的返回值，什么是错误的返回值。
 上面的open()函数约定返回-1表示错误。

 */

/*
 var r1, r2, s = null;
 try {
 r1 = s.length; // 此处应产生错误
 r2 = 100; // 该语句不会执行
 } catch (e) {
 alert('出错了：' + e);
 } finally {
 console.log('finally');
 }
 console.log('r1 = ' + r1); // r1应为undefined
 console.log('r2 = ' + r2); // r2应为undefined

 */

/*
 当代码块被try { ... }包裹的时候，
 就表示这部分代码执行过程中可能会发生错误，
 一旦发生错误，就不再继续执行后续代码，
 转而跳到catch块。catch (e) { ... }包裹的代码就是错误处理代码，
 变量e表示捕获到的错误。
 最后，无论有没有错误，
 finally一定会被执行。
 */

/*
 而没有错误发生时，执行流程像这样：

 先执行try { ... }的代码；
 因为没有出错，catch (e) { ... }代码不会被执行；
 最后执行finally { ... }代码。
 */

/*
 catch和finally可以不必都出现。
 也就是说，try语句一共有三种形式：

 完整的try ... catch ... finally：

 try {
 ...
 } catch (e) {
 ...
 } finally {
 ...
 }
 只有try ... catch，没有finally：

 try {
 ...
 } catch (e) {
 ...
 }
 只有try ... finally，没有catch：

 try {
 ...
 } finally {
 ...
 }
 */
/*
 JavaScript有一个标准的Error对象表示错误，
 还有从Error派生的TypeError、
 ReferenceError等错误对象。
 我们在处理错误时，可以通过catch(e)捕获的变量e访问错误对象：

 try {
 ...
 } catch (e) {
 if (e instanceof TypeError) {
 alert('Type error!');
 } else if (e instanceof Error) {
 alert(e.message);
 } else {
 alert('Error: ' + e);
 }
 }
 */

/*
 下面的代码让用户输入一个数字，
 程序接收到的实际上是一个字符串，
 然后用parseInt()转换为整数。
 当用户输入不合法的时候，我们就抛出错误：

 'use strict';

 var r, n, s;
 try {
 s = prompt('请输入一个数字');
 n = parseInt(s);
 if (isNaN(n)) {
 throw new Error('输入错误');
 }
 // 计算平方:
 r = n * n;
 alert(n + ' * ' + n + ' = ' + r);
 } catch (e) {
 alert('出错了：' + e);
 }

 */

/*
 JavaScript允许抛出任意对象，包括数字、字符串。
 但是，最好还是抛出一个Error对象。

 最后，当我们用catch捕获错误时，一定要编写错误处理语句：

 var n = 0, s;
 try {
 n = s.length;
 } catch (e) {
 console.log(e);
 }
 console.log(n);
 哪怕仅仅把错误打印出来，也不要什么也不干：

 var n = 0, s;
 try {
 n = s.length;
 } catch (e) {
 }
 console.log(n);
 因为catch到错误却什么都不执行，
 就不知道程序执行过程中到底有没有发生错误。

 处理错误时，
 请不要简单粗暴地用alert()把错误显示给用户。
 教程的代码使用alert()是为了便于演示。
 */