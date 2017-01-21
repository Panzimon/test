/**
 * Created by ZY on 2017/1/21.
 */

//arr ----> Array.prototype ----> Object.prototype ----> null
//foo ----> Function.prototype ----> Object.prototype ----> null

/*
 除了直接用{ ... }创建一个对象外，
 JavaScript还可以用一种构造函数的方法来创建对象。
 它的用法是，先定义一个构造函数

 function Student(name) {
 this.name = name;
 this.hello = function () {
 alert('Hello, ' + this.name + '!');
 }
 }

 这确实是一个普通函数，但是在JavaScript中，可以用关键字new来调用这个函数，并返回一个对象：

 var xiaoming = new Student('小明');
 xiaoming.name; // '小明'
 xiaoming.hello(); // Hello, 小明!
 注意，如果不写new，这就是一个普通函数，
 它返回undefined。
 但是，如果写了new，它就变成了一个构造函数，
 它绑定的this指向新创建的对象，
 并默认返回this，也就是说，不需要在最后写return this;。

 xiaoming ----> Student.prototype ----> Object.prototype ----> null

 用new Student()创建的对象还从原型上获得了一个constructor属性，
 它指向函数Student本身：

 xiaoming.constructor === Student.prototype.constructor; // true
 Student.prototype.constructor === Student; // true

 Object.getPrototypeOf(xiaoming) === Student.prototype; // true

 xiaoming instanceof Student; // true

 Object.getPrototypeOf(xiaoming) === Student.prototype;

 忘记了写new怎么办？

 在strict模式下，this.name = name将报错，
 因为this绑定为undefined，在非strict模式下，
 this.name = name不报错，因为this绑定为window，
 于是无意间创建了全局变量name，并且返回undefined，这个结果更糟糕

 为了区分普通函数和构造函数，按照约定，
 构造函数首字母应当大写，而普通函数首字母应当小写，
 这样，一些语法检查工具如jslint将可以帮你检测到漏写的new
 */
