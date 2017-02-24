/**
 * Created by ZY on 2017/2/19.
 */

//闭包遇上异步
function wrongEx() {
    for(var i = 0; i < 10; ++i){
        setTimeout(function () {
            console.log(i)
        },0);
    }
}

function iife() {
    for(var i = 0 ; i<10; i++){
        (function (index) {
            setTimeout(function () {
                console.log(index)
            },0);
        })(i);
    }
}

function doSetTimeout(index) {
    setTimeout(function () {
        console.log(index)
    },0);
}

function doDoSetTimeout() {
    for(var i = 0; i <10; i++){
        doSetTimeout(i);
    }
}

//wrongEx(); 输出10个10
//iife(); 0123456789
//doDoSetTimeout(); 0123456789



//柯里化函数实现：
/*
实现如下功能~
 var result = sum(1)(2)(3);

 console.log(result);//6
 */

//only 3 times
function add1(a){
    let sum = 0;
    sum +=a;
    return function (b) {
        sum +=b;
        return function(c){
            sum +=c;
            return sum;
        }
    }
}


//console.log(add1(1)(2)(3));//6

/*
 我们可以发现返回的每一个函数执行的逻辑其实都是一样的。
 就此我们可以精简下代码,让函数返回后返回自身。

 来试一下：

 function add(a){

 var sum = 0;
 sum += a;

 return function temp(b) {
 sum += b;
 return temp;
 }
 }

 add(2)(3)(4)(5);

 输出的结果：

 //function temp(b) {
 //        sum += b;
 //        return temp;
 //    }
 并没有像我们预期的那样输出 14，
 其实是这样的，每次函数调用后返回的就是一个函数对象，
 那最后的结果，肯定是一个字符串表示啊。
 */

function add2(a) {
    var sum = 0;
    sum += a;

    return function temp(b) {
        if (arguments.length === 0){
            return sum;
        }else{
            sum += b;
            return temp;
        }
    }
}

//console.log(add2(2)(3)(4)(5)(6)());//20


//如果要使用匿名函数，也可以：


function add3() {

    var _args = [];

    return function(){

        if(arguments.length === 0) {
            return _args.reduce(function(a,b) {
                return a + b;
            });
        }

        [].push.apply(_args, [].slice.call(arguments));

        return arguments.callee;
    }
}

//var sum = add3();
//console.log(add3()(2,3)(4)(5)());

//利用JS中对象到原始值的转换规则。
// toString & valueOf

function add4(a) {
    var sum = 0;
    sum += a;

    var temp = function (b) {
        if(arguments.length === 0){
            return sum;
        }else{
            sum += b;
            return temp;
        }
    };

    temp.toString = temp.valueOf = function () {
        return sum;
    };

    return temp;
}

//console.log(add4(2)(3)(4)(5)(1));
//NODE:{ [Number: 15] valueOf: [Function], toString: [Function] }
//Browser: function 15

//通用的柯里化函数
var currying1 = function (fn) {
    var _args = [];

    return function cb() {
        if(arguments.length === 0){
            return fn.apply(this , _args);
        }

        [].push.apply(_args,[].slice.call(arguments));

        return cb;
    }
};

var multi =function () {
    var total = 0;
    var argsArray = [].slice.call(arguments);

    argsArray.forEach(function (item) {
        total += item;
    });

    return total ;
};

/*
var calc = currying1(multi);

calc(1,2)(3,6)(4,5,6);

console.log(calc()); //空白调用时才真正计算
 */

/*
 这样 calc = currying1(multi)，
 调用非常清晰.如果要 累加多个值，
 可以把多个值作为做个参数 calc(1,2,3)，
 也可以支持链式的调用，如 calc(1)(2)(3)；

 到这里， 不难看出，柯里化函数具有以下特点：

 函数可以作为参数传递
 函数能够作为函数的返回值
 闭包
 */

//利用柯里化简化数组计算函数

function currying2(fn) {
    var slice = Array.prototype.slice,
        __args = slice.call(arguments, 1);
    return function () {
        var __inargs = slice.call(arguments);
        return fn.apply(null, __args.concat(__inargs));
    };
}

function square(i) {
    return i * i;
}

function double(i) {
    return i *= 2;
}

function map(handeler, list) {
    return list.map(handeler);
}

var mapSQ = currying2(map, square);
mapSQ([1, 2, 3, 4, 5]); //[1, 4, 9, 16, 25]


var mapDB = currying2(map, double);
mapDB([1, 2, 3, 4, 5]); //[2, 4, 6, 8, 10]

/*
 2 延迟执行。

 柯里化的另一个应用场景是延迟执行。
 不断的柯里化，累积传入的参数，最后执行。

 例子略
 */

/*
 3.固定易变因素。

 柯里化特性决定了它这应用场景。提前把易变因素，
 传参固定下来，生成一个更明确的应用函数。最典型的代表应用，
 是bind函数用以固定this这个易变对象。
 */
/*
 Function.prototype.bind = function(context) {
 var _this = this,
 _args = Array.prototype.slice.call(arguments, 1);
 return function() {
 return _this.apply(context,
 _args.concat(Array.prototype.slice.call(arguments)));
 }
 }
 */

/*
 Function.prototype.bind
 方法也是柯里化应用与 call/apply 方法直接执行不同，
 bind 方法 将第一个参数设置为函数执行的上下文，
 其他参数依次传递给调用方法（函数的主体本身不执行，
 可以看成是延迟执行），
 并动态创建返回一个新的函数， 这符合柯里化特点。
 */

/*
 var foo = {
 x: 666
 };

 var bar = function () {
 console.log(this.x);
 }.bind(foo); // 绑定

 bar(); //666

 // 下面是一个 bind 函数的模拟，
 testBind 创建并返回新的函数，
 在新的函数中将真正要执行业务的函数绑定到实参传入的上下文，
 延迟执行了。
 Function.prototype.testBind = function (scope) {
 var self = this;
 // this 指向的是调用 testBind 方法的一个函数，
 return function () {
 return self.apply(scope);
 }
 };

 var testBindBar = bar.testBind(foo);  // 绑定 foo，延迟执行
 console.log(testBindBar);
 // Function (可见，bind之后返回的是一个延迟执行的新函数)
 testBindBar(); // 666
 */




// 关于curry性能的备注
/*
 关于curry性能的备注
 通常，使用柯里化会有一些开销。
 取决于你正在做的是什么，可能会或不会，
 以明显的方式影响你。也就是说，几乎大多数情况，
 你的代码的拥有性能瓶颈首先来自其他原因，而不是这个。
 有关性能，这里有一些事情必须牢记于心：

 存取arguments对象通常要比存取命名参数要慢一点.
 一些老版本的浏览器在arguments.length的实现上是相当慢的.
 创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上.
 以上 ;)
 */


//一个小小的JavaScript题目
var length = 10;
function fn() {
    console.log(this.length);
};
var obj = {
    length: 5,
    method: function (fn) {
        fn();
        arguments[0]();
        fn.call(obj, 12);
    }
};
//obj.method(fn, 1);

//undefined
//2
//5

