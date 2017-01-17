/**
 * Created by ZY on 2017/1/18.
 */
function add(x, y, f) {
    return f(x) + f(y);
}

var m = add(-5, 6, Math.abs);

console.log(m);

function pow(x) {
    return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var n = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
console.log(n);

var f = function (x) {
    return x * x;
};

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var result = [];
for (var i=0; i<arr.length; i++) {
    result.push(f(arr[i]));
}
console.log(result);

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.map(String)); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']

/*
 reduce()把结果继续和序列的下一个元素做累积计算，其效果就是：

 [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
 */

var arr = [1, 3, 5, 7, 9];
var s = arr.reduce(function (x, y) {
    return x + y;
}); // 25
console.log(s);

//要把[1, 3, 5, 7, 9]变换成整数13579，reduce()也能派上用场：

var arr1 = [1, 3, 5, 7, 9];
var ss = arr1.reduce(function (x, y) {
    return x * 10 + y;
}); // 13579
console.log(ss);
//大神解答↓
function string2int(s) {
    return s.split('').map(function (str) {
        return "0123456789".indexOf(str);
    }).reduce(function (a, b) {
        return a * 10 + b;
    })
}

function stringToint(s) {
    return +s;
}
//全部变小写
function LowerCase1(arr) {

    return arr.map(function(word){
        return word.split().map(
            function(letter){
                return letter.toLowerCase();}).toString();
    });
}
//简单写法
function LowerCase2(arr) {

    return arr.map(function(word){
        return word.toLowerCase();
    });
}
//名字写法正常化
function normalize(arr) {

    return arr.map(function(word){
        return word[0].toUpperCase()+word.substring(1).toLowerCase();
    });
}