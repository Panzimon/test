/**
 * Created by ZY on 2017/1/21.
 */

//JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。
/*
 在JSON中，一共就这么几种数据类型：

 number：和JavaScript的number完全一致；
 boolean：就是JavaScript的true或false；
 string：就是JavaScript的string；
 null：就是JavaScript的null；
 array：就是JavaScript的Array表示方式——[]；
 object：就是JavaScript的{ ... }表示方式。
 以及上面的任意组合。

 JSON还定死了字符集必须是UTF-8

 JSON的字符串规定必须用双引号""，Object的键也必须用双引号""
 */

//序列化成JSON格式的字符串
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

console.log(JSON.stringify(xiaoming,null,'  '));
//第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，
// 可以传入Array
console.log(JSON.stringify(xiaoming,['name','height'],'  '));

//还可以传入一个函数，这样对象的每个键值对都会被函数先处理：

function convert(key, value) {
    if (typeof value === 'string') {
        return value.toLowerCase();
    }
    return value;
}

console.log(JSON.stringify(xiaoming, convert, '  '));

//如果我们还想要精确控制如何序列化小明，
// 可以给xiaoming定义一个toJSON()的方法，
// 直接返回JSON应该序列化的数据：

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};

console.log(JSON.stringify(xiaoming,null,'  '));

//反序列化：
// 拿到一个JSON格式的字符串，
// 我们直接用JSON.parse()把它变成一个JavaScript对象

function* Par(){
    yield JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
    yield JSON.parse('{"name":"小明","age":14}', function (key, value) {
        if (key === 'name') {
            return value + '同学';
        }
        return value;
    }); // Object {name: '小明', age: 14}
    yield JSON.parse('true'); // true
    yield JSON.parse('123.45'); // 123.45
}

for (var i of Par()){
    console.log(i);
}