/**
 * Created by ZY on 2017/1/19.
 */

//generator跟函数很像，定义如下：

function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
//generator和函数不同的是，generator由function*定义（注意多出的*号），
// 并且，除了return语句，还可以用yield返回多次。

console.log(foo(1).next());

console.log((function fib(max) {
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        t = a + b;
        a = b;
        b = t;
        arr.push(t);
    }
    return arr;
})(20));

function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 1;
    while (n < max) {
        yield a;
        t = a + b;
        a = b;
        b = t;
        n ++;
    }
    return a;
}

console.log(fib(3).toString());

var f = fib(4);
console.log(f .next(236));
console.log(f .next(3));
console.log(f .next(6));
console.log(f .next(5));
console.log(f .next(5));

for (var x of fib(23)){//把fib(23)换成f不报错，但是也没输出？？？why
    console.log(x);
}

//例如，用一个对象来保存状态，得这么写：

var fibo = {
    a: 0,
    b: 1,
    n: 0,
    max: 5,
    next: function () {
        var
            r = this.a,
            t = this.a + this.b;
        this.a = this.b;
        this.b = t;
        if (this.n < this.max) {
            this.n ++;
            return r;
        } else {
            return undefined;
        }
    }
};
//generator还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。
// 这个好处要等到后面学了AJAX以后才能体会到

/*
 ajax('http://url-1', data1, function (err, result) {
 if (err) {
 return handle(err);
 }
 ajax('http://url-2', data2, function (err, result) {
 if (err) {
 return handle(err);
 }
 ajax('http://url-3', data3, function (err, result) {
 if (err) {
 return handle(err);
 }
 return success(result);
 });
 });
 });
 */

//generator↓
// 回调越多，代码越难看。
// 有了generator的美好时代，用AJAX时可以这么写：
// p.s.看上去是同步的代码，实际执行是异步的。
/*

 try {
 r1 = yield ajax('http://url-1', data1);
 r2 = yield ajax('http://url-2', data2);
 r3 = yield ajax('http://url-3', data3);
 success(r3);
 }
 catch (err) {
 handle(err);
 }
 */

//由于函数无法保存状态，故需要一个全局变量current_id来保存数字。

//不用闭包，试用generator改写：


var current_id = 0;

function next_id() {
    current_id ++;
    return current_id;
}

function* next_id() {

    var x = 1;

    while(1){yield x;x++;}
}