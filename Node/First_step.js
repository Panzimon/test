/**
 * Created by XYSM on 2017/1/25.
 */
/*
 Word和写字板保存的不是纯文本文件。
 如果我们要用记事本来编写JavaScript代码，
 要务必注意，记事本以UTF-8格式保存文件时，
 会自作聪明地在文件开始的地方加上几个特殊字符（UTF-8 BOM），
 结果经常会导致程序运行出现莫名其妙的错误。
 */
//所以，用记事本写代码时请注意，
// 保存文件时使用ANSI编码，并且暂时不要输入中文
/*
 我们可以给Nodejs传递一个参数，
 让Node直接为所有js文件开启严格模式：

 node --use_strict calc.js
 */