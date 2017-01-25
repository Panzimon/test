//在Node环境中，一个.js文件就称之为一个模块（module）

/*
 使用模块还可以避免函数名和变量名冲突。
 相同名字的函数和变量完全可以分别存在不同的模块中，
 因此，我们自己在编写模块时，不必考虑名字会与其他模块冲突
 */

var greet = require('./hellotest');

var s = 'Micheal';

greet(s);