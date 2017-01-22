/**
 * Created by ZY on 2017/1/22.
 */
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this,props);
    this.grade = props.grade || 5 ;
}
/*
 调用了Student构造函数不等于继承了Student，
 PrimaryStudent创建的对象的原型是：

 new PrimaryStudent() ---->
 PrimaryStudent.prototype ----> Object.prototype ----> null
 必须想办法把原型链修改为：

 new PrimaryStudent() ----> PrimaryStudent.prototype
 ----> Student.prototype ----> Object.prototype ----> null
 */
//直接
//PrimaryStudent.prototype = Student.prototype ;
//好吧，这样不行

//正解→借助一个中间函数实现正确的原型链
function F() {
}

F.prototype = Student.prototype ;

PrimaryStudent.prototype = new F();
// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent ;

PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};//在PrimaryStudent原型（就是new F()对象）上定义方法

var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});
console.log(xiaoming.name); // '小明'
console.log(xiaoming.grade);

xiaoming._proto_ === PrimaryStudent.prototype; // true
console.log(xiaoming.__proto__.__proto__ === Student.prototype); // true

// 验证继承关系:
xiaoming instanceof PrimaryStudent; // true
xiaoming instanceof Student; // true

function  inherits(child,parent) {
    var F = function () {

    };
    F.prototype = parent.prototype;
    child.prototype = new F();//new F()别老记成 F.prototype
    child.prototype.constructor = child;
}
