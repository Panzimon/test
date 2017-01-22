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
