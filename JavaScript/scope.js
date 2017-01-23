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

 function getAge() {
 var y = new Date().getFullYear();
 return y - this.birth;
 }

 var xiaoming = {
 name: '小明',
 birth: 1990,
 age: getAge
 };

 xiaoming.age(); // 25, 正常结果
 getAge(); // NaN


 方法

 阅读: 88142
 在一个对象中绑定函数，称为这个对象的方法。

 在JavaScript中，对象的定义是这样的：

 var xiaoming = {
 name: '小明',
 birth: 1990
 };
 但是，如果我们给xiaoming绑定一个函数，就可以做更多的事情。比如，写个age()方法，返回xiaoming的年龄：

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
 绑定到对象上的函数称为方法，和普通函数也没啥区别，但是它在内部使用了一个this关键字，这个东东是什么？

 在一个方法内部，this是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。所以，this.birth可以拿到xiaoming的birth属性。

 让我们拆开写：

 function getAge() {
 var y = new Date().getFullYear();
 return y - this.birth;
 }

 var xiaoming = {
 name: '小明',
 birth: 1990,
 age: getAge
 };

 xiaoming.age(); // 25, 正常结果
 getAge(); // NaN
 单独调用函数getAge()怎么返回了NaN？请注意，我们已经进入到了JavaScript的一个大坑里。

 JavaScript的函数内部如果调用了this，那么这个this到底指向谁？

 答案是，视情况而定！

 如果以对象的方法形式调用，比如xiaoming.age()，该函数的this指向被调用的对象，也就是xiaoming，这是符合我们预期的。

 如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window。

 坑爹啊！

 更坑爹的是，如果这么写：

 var fn = xiaoming.age; // 先拿到xiaoming的age函数
 fn(); // NaN
 也是不行的！要保证this指向正确，必须用obj.xxx()的形式调用！

 由于这是一个巨大的设计错误，要想纠正可没那么简单。ECMA决定，在strict模式下让函数的this指向undefined，因此，在strict模式下，你会得到一个错误：

 'use strict';

 var xiaoming = {
 name: '小明',
 birth: 1990,
 age: function () {
 var y = new Date().getFullYear();
 return y - this.birth;
 }
 };

 var fn = xiaoming.age;
 fn(); // Uncaught TypeError: Cannot read property 'birth' of undefined
 这个决定只是让错误及时暴露出来，并没有解决this应该指向的正确位置。

 有些时候，喜欢重构的你把方法重构了一下：

 'use strict';

 var xiaoming = {
 name: '小明',
 birth: 1990,
 age: function () {
 function getAgeFromBirth() {
 var y = new Date().getFullYear();
 return y - this.birth;
 }
 return getAgeFromBirth();
 }
 };

 xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined
 结果又报错了！原因是this指针只在age方法的函数内指向xiaoming，在函数内部定义的函数，this又指向undefined了！（在非strict模式下，它重新指向全局对象window！）

 修复的办法也不是没有，我们用一个that变量首先捕获this：

 'use strict';

 var xiaoming = {
 name: '小明',
 birth: 1990,
 age: function () {
 var that = this; // 在方法内部一开始就捕获this
 function getAgeFromBirth() {
 var y = new Date().getFullYear();
 return y - that.birth; // 用that而不是this
 }
 return getAgeFromBirth();
 }
 };

 xiaoming.age(); // 25

 Math.max.apply(null, [3, 5, 4]); // 5
 Math.max.call(null, 3, 5, 4); // 5

 var count = 0;
 var oldParseInt = parseInt; // 保存原函数

 window.parseInt = function () {
 count += 1;
 return oldParseInt.apply(null, arguments); // 调用原函数
 };

 // 测试:
 parseInt('10');
 parseInt('20');
 parseInt('30');
 count; // 3
 //加个计数器


 */

