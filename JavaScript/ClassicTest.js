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

