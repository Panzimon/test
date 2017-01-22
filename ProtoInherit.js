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
PrimaryStudent.prototype = Student.prototype ;
//好吧，这样不行
