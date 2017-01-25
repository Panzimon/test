/**
 * Created by XYSM on 2017/1/25.
 */
var _ = require('underscore');

/*
 console.log('Hello, world!');
 // 输出'Hello, world!'

 var log = console.log;
 log('Hello, world!');
 // Uncaught TypeError: Illegal invocation
 */
var log = console.log;
// 调用call并传入console对象作为this:
log.call(console, 'Hello, world!')
// 输出Hello, world!

var logtest = log.bind(console);
logtest('test');

var log = _.bind(console.log, console);
log('Hello, world!');

//partial()就是为一个函数创建偏函数
// Math.pow(x, y)
//这个新函数pow2N(y)就是根据Math.pow(x, y)创建出来的偏函数，
// 它固定住了原函数的第一个参数（始终为2）：


var pow2N = _.partial(Math.pow, 2);
pow2N(3); // 8
pow2N(5); // 32
pow2N(10); // 1024

//比如，希望创建一个偏函数cube(x)，
// 计算x3，可以用_作占位符，固定住第二个参数：


var cube = _.partial(Math.pow, _, 3);
cube(3); // 27
cube(5); // 125
cube(10); // 1000

//如果一个函数调用开销很大，
// 我们就可能希望能把结果缓存下来，
// 以便后续调用时直接获得结果。举个例子，计算阶乘就比较耗时：


function factorial(n) {
    console.log('start calculate ' + n + '!...');
    var s = 1, i = n;
    while (i > 1) {
        s = s * i;
        i --;
    }
    console.log(n + '! = ' + s);
    return s;
}

factorial(10);
// 3628800
// 注意控制台输出:
// start calculate 10!...
// 10! = 3628800

//用memoize()就可以自动缓存函数计算的结果：
var factorial = _.memoize(function(n) {
    console.log('start calculate ' + n + '!...');
    var s = 1, i = n;
    while (i > 1) {
        s = s * i;
        i --;
    }
    console.log(n + '! = ' + s);
    return s;
});
factorial(10);

// 第二次调用:
factorial(10); // 3628800
// 控制台没有输出

//对于相同的调用，比如连续两次调用factorial(10)，
// 第二次调用并没有计算，而是直接返回上次计算后缓存的结果。
// 不过，当你计算factorial(9)的时候，仍然会重新计算

//改进为递归
var factorial = _.memoize(function(n) {
    console.log('start calculate ' + n + '!...');
    if (n < 2) {
        return 1;
    }
    return n * factorial(n - 1);
});
factorial(10); // 3628800
// 输出结果说明factorial(1)~factorial(10)都已经缓存了:
// start calculate 10!...
// start calculate 9!...
// start calculate 8!...
// start calculate 7!...
// start calculate 6!...
// start calculate 5!...
// start calculate 4!...
// start calculate 3!...
// start calculate 2!...
// start calculate 1!...

factorial(9); // 362880
// console无输出

//如果你有一个方法叫register()，
// 用户在页面上点两个按钮的任何一个都可以执行的话，
// 就可以用once()保证函数仅调用一次，无论用户点击多少次：


var register = _.once(function () {
    console.log('Register ok!');
});

// 测试效果:
register();
register();
register();

//delay()可以让一个函数延迟执行，
// 效果和setTimeout()是一样的，
// 但是代码明显简单了：

// 2秒后调用alert():
_.delay(console.log('?'), 1000);


///如果要延迟调用的函数有参数，把参数也传进去：
_.delay(log,2000,'Hello,','world!');
// 2秒后打印'Hello, world!':