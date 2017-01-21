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

console.log(Xiaoming);
Xiaoming.run(5);