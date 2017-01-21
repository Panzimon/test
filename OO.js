/**
 * Created by ZY on 2017/1/21.
 */
//在JavaScript中，这个概念需要改一改。JavaScript不区分类和实例的概念，
// 而是通过原型（prototype）来实现面向对象编程。

var stu = {
  name : 'SB',
  height :180,
  run :function (speed) {
      console.log(this.name +
          ' is running at the speed of ' + speed +' km/D');
  }
  //...
};

var Xiaoming = {
    name : 'XM',
};

Xiaoming.__proto__ = stu;//_proto_不等于prototype！

console.log(Xiaoming.name);
Xiaoming.run(5);

var Bird = {
    fly: function () {
        console.log(this.name + ' is flying...');
    }
};

Xiaoming.__proto__ = Bird;
Xiaoming.fly();

/*
 请注意，上述代码仅用于演示目的。在编写JavaScript代码时，
 不要直接用obj.__proto__去改变一个对象的原型，
 并且，低版本的IE也无法使用__proto__。
 Object.create()方法可以传入一个原型对象，
 并创建一个基于该原型的新对象，
 但是新对象什么属性都没有，
 因此，我们可以编写一个函数来创建xiaoming
 */

var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run(); // 小明 is running...
xiaoming._proto_ === Student;