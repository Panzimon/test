/**
 * Created by ZY on 2017/1/18.
 */
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}
var f1 = lazy_sum([1, 2, 3, 4, 5]);
var f2 = lazy_sum([1, 2, 3, 4, 5]);
console.log(f1 === f2); // false

//返回函数不要引用任何循环变量，或者后续会发生变化的变量
function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];//16
var f2 = results[1];//16
var f3 = results[2];//16

/*
正确写法
 function count() {
 var arr = [];
 for (var i=1; i<=3; i++) {
 arr.push((function (n) {
 return function () {
 return n * n;
 }
 })(i));//IFE
 }
 return arr;
 }

 var results = count();
 var f1 = results[0];
 var f2 = results[1];
 var f3 = results[2];

 f1(); // 1
 f2(); // 4
 f3(); // 9

 function (x) { return x * x } (3);
 但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来：

 (function (x) { return x * x }) (3);
 */
function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function () {
            x += 1;
            return x;
        }
    }
}

var c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

var c2 = create_counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13

function make_pow(n) {
    return function (x) {
        return Math.pow(x, n);
    }
}
console.log(make_pow(4)(4));


// 定义数字0:
var zero = function (f) {
    return function (x) {
        return x;
    }
};

// 定义数字1:
var one = function (f) {
    return function (x) {
        return f(x);
    }
};

// 定义加法:
function add(n, m) {
    return function (f) {
        return function (x) {
            return m(f)(n(f)(x));
        }
    }
}

// 计算数字2 = 1 + 1:
var two = add(one, one);

// 计算数字3 = 1 + 2:
var three = add(one, two);

// 计算数字5 = 2 + 3:
var five = add(two, three);

// 你说它是3就是3，你说它是5就是5，你怎么证明？

// 呵呵，看这里:

// 给3传一个函数,会打印3次:
(three(function () {
    console.log('print 3 times');
}))();

// 给5传一个函数,会打印5次:
(five(function () {
    console.log('print 5 times');
}))();

// 继续接着玩一会...



