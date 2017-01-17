/**
 * Created by ZY on 2017/1/17.
 */
/*
 'use strict';

 function foo() {
 var x = 1;
 x = x + 1;
 }

 x = x + 2; // ReferenceError! 无法在函数体外引用变量x

 'use strict';

 function foo() {
 var x = 1;
 function bar() {
 var y = x + 1; // bar可以访问foo的变量x!
 }
 var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
 }
 */


function foo() {
    var x = 1;
    function bar() {
        var x = 'A';
        console.log('x in bar() = ' + x); // 'A'
    }
    console.log('x in foo() = ' + x); // 1
    bar();
}

foo();

/*
 'use strict';

 function foo() {
 var x = 'Hello, ' + y;
 console.log(x);
 var y = 'Bob';
 }

 foo();
 //虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，
 //原因是变量y在稍后申明了。但是alert显示Hello, undefined，
 //说明变量y的值为undefined。这正是因为JavaScript引擎自动提升了
 //变量y的声明，但不会提升变量y的赋值。
 //对于上述foo()函数，JavaScript引擎看到的代码相当于：

 function foo() {
 var y; // 提升变量y的申明
 var x = 'Hello, ' + y;
 console.log(x);
 y = 'Bob';
 }

 'use strict';

 function foo() {
 var sum = 0;
 for (let i=0; i<100; i++) {
 sum += i;
 }
 i += 1; // SyntaxError
 }

 var xiaoming = {
 name: '小明',
 birth: 1990,
 age: function () {
 var y = new Date().getFullYear();
 return y - this.birth;
 }
 };

 xiaoming.age; // function xiaoming.age()
 xiaoming.age(); // 今年调用是25,明年调用就变成26了
 绑定到对象上的函数称为方法
 */

