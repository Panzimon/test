/**
 * Created by XYSM on 2017/1/25.
 */
var _ = require('underscore');
//keys()可以非常方便地返回一个object自身所有的key，
// 但不包含从原型链继承下来的：


function Student(name, age) {
    this.name = name;
    this.age = age;
}

var xiaoming = new Student('小明', 20);
console.log(_.keys(xiaoming)); // ['name', 'age']

//allKeys()除了object自身的key，还包含从原型链继承下来的：

function Student(name, age) {
    this.name = name;
    this.age = age;
}
Student.prototype.school = 'No.1 Middle School';
var xiaoming = new Student('小明', 20);
console.log(_.allKeys(xiaoming));
// ['name', 'age', 'school']

//和keys()类似，
// values()返回object自身但不包含原型链继承的所有值：

var obj = {
    name: '小明',
    age: 20
};

console.log(_.values(obj)); // ['小明', 20]

//mapObject()就是针对object的map版本

var obj = { a: 1, b: 2, c: 3 };
// 注意传入的函数签名，value在前，key在后:
console.log(_.mapObject(obj, (v, k) => 100 + v));
// { a: 101, b: 102, c: 103 }

//invert()把object的每个key-value来个交换，
// key变成value，value变成key：

var obj = {
    Adam: 90,
    Lisa: 85,
    Bart: 59
};
console.log(_.invert(obj));
// { '59': 'Bart', '85': 'Lisa', '90': 'Adam' }

var a = {name: 'Bob', age: 20};
_.extend(a, {age: 15}, {age: 88, city: 'Beijing'});
// {name: 'Bob', age: 88, city: 'Beijing'}
// 变量a的内容也改变了：
console.log(a);
// {name: 'Bob', age: 88, city: 'Beijing'}

//如果有相同的key，
// 后面的object的value将覆盖前面的object的value。

//extendOwn()和extend()类似，
// 但获取属性时忽略从原型链继承下来的属性

//复制一个object对象，
// 就可以用clone()方法，
// 它会把原有对象的所有属性都复制到新的对象中：

var source = {
    name: '小明',
    age: 20,
    skills: ['JavaScript', 'CSS', 'HTML']
};

var copied = _.clone(source);

/*
 clone()是“浅复制”。所谓“浅复制”就是说，
 两个对象相同的key所引用的value其实是同一对象：

 source.skills === copied.skills; // true
 也就是说，修改source.skills会影响copied.skills
 */

//isEqual()对两个object进行深度比较，
// 如果内容完全相同，则返回true：

var o1 = { name: 'Bob', skills: { Java: 90, JavaScript: 99 }};
var o2 = { name: 'Bob', skills: { JavaScript: 99, Java: 90 }};

o1 === o2; // false
_.isEqual(o1, o2); // true

//isEqual()其实对Array也可以比较：

var o1 = ['Bob', { skills: ['Java', 'JavaScript'] }];
var o2 = ['Bob', { skills: ['Java', 'JavaScript'] }];

o1 === o2; // false
_.isEqual(o1, o2); // true

/*
 注意区分修改和重新赋值：

 // 这是修改:
 source.skills[0] = 9999;

 // 这是重新赋值：
 source.skills = 'str'
 */

/*
 （1）clone()方法是浅拷贝，对象的引用是不同的，
 但是对象属性值的引用与原对象是一致的；

 （2）修改是改变原对象值的引用所指向的内存地址存储的值，
 此时原对象和复制得到的新对象的属性值引用还是原来的，并没有变化，
 所以，这种修改，是俩个对象的属性值都会变化；

 （3）重新赋值是开辟一个新的内存空间存新的值，
 这时候原对象属性值的引用已经不是之前的引用了，
 换句话说，这已经不是当时要复制的对象了，
 对之前复制得到的对象没有影响。
 */

source.skills[0]='Java';//copied 也变
source.age = 30;//copied 不变
