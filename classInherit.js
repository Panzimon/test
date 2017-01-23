/**
 * Created by ZY on 2017/1/22.
 */
class Student {
    constructor(name) {
        this.name = name;
   }

    hello() {
        console.log('Hello, ' + this.name + '!');
    }
}

//避免了分散的代码，重新定义一个Student.prototype之类的

var xm = new Student("xiaoming");
xm.hello();

class PrimaryStudent extends Student{
    constructor(name,grade){
        super(name);
        this.grade = grade;
    }
    myGrade(){
        console.log('I am at grade '+ this.grade);
    }
}
//class的好处就是极大地简化了原型链代码

/*
 不是所有的主流浏览器都支持ES6的class。如果一定要现在就用上，
 就需要一个工具把class代码转换为传统的prototype代码，
 可以试试Babel这个工具
 */

