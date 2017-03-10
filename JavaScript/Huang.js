/**
 * Created by ZY on 2017/3/10.
 */

function Universe() {

    // 缓存的实例
    var instance = this;
    //console.log(this);
    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    // 重写构造函数
    Universe = function () {
        instance.start_time += 1;
        //console.log(this);
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
//console.log(uni4.start_time);

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
