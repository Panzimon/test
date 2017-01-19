/**
 * Created by ZY on 2017/1/20.
 */

var g;
g = function*() {
    var now = new Date();
    yield now;
    yield now.getFullYear(); // 2015, 年份
    yield now.getMonth(); // 5, 月份，注意月份范围是0~11，5表示六月
    yield now.getDate(); // 24, 表示24号
    yield  now.getDay(); // 3, 表示星期三
    yield now.getHours(); // 19, 24小时制
    yield    now.getMinutes(); // 49, 分钟
    yield   now.getSeconds(); // 22, 秒
    yield   now.getMilliseconds(); // 875, 毫秒数
    yield   now.getTime(); // 1435146562875, 以number形式表示的时间戳
    return true;
};
for(var i of g()){
    console.log(i);
}

var d = new Date(2015, 4, 6, 23, 30, 10,13 );
console.log(d);

console.log(new Date().getTimezoneOffset()/60);

console.log(d.toLocaleDateString());
console.log(d.toUTCString());//toUTCString() UTC时间

if (!Date.now) {
    console.log(new Date().getTime());
} else {
    console.log(Date.now()); // 老版本IE没有now()方法
}

