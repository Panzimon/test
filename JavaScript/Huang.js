/**
 * Created by ZY on 2017/3/10.
 */
/*
function Universe() {

    // 缓存的实例
    var instance = this;
    //console.log(this);
    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    // 重写构造函数
    Universe = function () {
        //instance.start_time += 1;
        console.log(this);
        return this;
        //改成return this，uni2.bang是undefined
    };
}

// 测试
var uni = new Universe();
console.log(uni);
var uni2 = new Universe();
console.log(uni2);
var uni3 = new Universe();
var uni4 = new Universe();
uni.bang = "123";
console.log(uni === uni2); // true
//console.log(uni3 === uni4);
console.log(uni2.bang); // 123
console.log(uni2.start_time);
//console.log(uni4.start_time);
*/
/*
function Universe() {

    // 缓存的实例
    var instance = this;
    //console.log(this);
    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    instance.start_time += 1;
    console.log(instance);
}
var uni = new Universe();
var uni2 = new Universe();
uni.bang = "123";
console.log(uni === uni2);
console.log(uni2.bang);
 Universe { start_time: 1, bang: 'Big' }
 Universe { start_time: 1, bang: 'Big' }
 false
 Big
 *//*
function Universe() {
    // 缓存的实例
    var instance = this;

    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    // 重写构造函数
    Universe = function () {
        console.log('ok');
        return instance;
        //改成return this，uni2.bang是undefined
    };
}

var uni = Object.create(Universe.prototype);
Universe.call(uni);
console.log(uni);
var uni2 = new Universe();
//var uni2 = Object.create(Universe.prototype);
//Universe.call(uni2);
console.log(uni2);
//
var uni3 = Object.create(null);
uni3.prototype = Universe.prototype;
Universe.call(uni3);
console.log(uni3);
//
uni.bang = "123";
console.log(uni === uni2);
console.log(uni2.bang);
 */

/*
var single = (function () {
    // 缓存的实例
    var instance;
    function Universe() {
        // 其它内容
        this.start_time = 0;
        this.bang = "Big";
    }
    instance = new Universe();
    console.log('ok');
    return instance;
})();
var uni = single;
var uni2 = single;
uni.bang = "123";
console.log(uni === uni2); // true
console.log(uni2.bang); // 123
*/
/*
var ins = (function () {

    // 缓存的实例
    var instance = this;
    //console.log(this);
    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    instance.start_time += 1;
    console.log(1);
    return instance;
})();
var uni = ins;
var uni2 = ins;
uni.bang = "123";
console.log(uni === uni2); // true
console.log(uni2.bang); // 123
 */

//原问题：

/*
 function Universe() {
 // 缓存的实例
 var instance = this;

 // 其它内容
 this.start_time = 0;
 this.bang = "Big";

 // 重写构造函数
 Universe = function () {
 alert(1)
 return instance;
 //改成return this，uni2.bang是undefined
 };
 }

 // 测试
 var uni = new Universe();
 var uni2 = new Universe();
 uni.bang = "123";
 console.log(uni === uni2); // true
 console.log(uni2.bang); // 123
 这里new了两次Universe()，只alert了一次1，为什么呢？
 然后重写构造函数里，把 return instance;
 改成return this，uni2.bang是undefined，两个有什么区别呢？
 */

//我的回答：

/*
 不知道题主知道原因没有，小白试着理解一波...
 首先，是var uni = new Universe();
 这一步先是用instance保存了Universe这个函数的this指向，
 instance一直留在内存里面，重写构造函数的时候不会执行alert(1)。
 这个重写相当于重新给一个已经声明了的变量赋值嘛，平时写完

 first：var a = function(){
 //do sth
 };
 second：a = function(){
 alert('sth');
 };
 也不会alert出东西吧。
 接着是var uni2 = new Universe();这个时候new的直接就是重写部分

 function Universe () {
 alert(1)
 return instance;
 };
 了，1也就因为Universe被new，
 如UKer所说“跟调用普通函数一样”alert出来了，
 然后接下来无论var uni[3456] = new Universe(); 1 也都会alert出来。

 而第二个问题，把instance改成this，
 uni还可以拿到指向原Universe的this，
 uni2因为重写之后this并不是指向原Universe，
 指向的是重写后的空的Universe {}。
 所以uni === uni2 //false。
 你uni.bang = "123";是给原Universe.bang赋值，
 而uni2里面啥都没有，
 所以无论uni2.start_time还是uni2.bang都是undefined 。

 表达能力一般，希望题主看完能理解~O(∩_∩)O~
 */

//UKer大神回答：
/*
 第一次运行，
 返回了重写前的构造函数的实例————这种事普通的构造函数，
 只是函数内部重写了Universe，并且形成了一个闭包

 第二次运行，
 如果返回instance，
 就跟调用普通函数一样（这种方式类似于稳妥构造函数模式）。
 如果返回this，
 则就是又调用了一次普通的构造函数，返回一个{}，
 其没有任何实例属性。
 */