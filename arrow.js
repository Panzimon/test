/**
 * Created by ZY on 2017/1/19.
 */
var t1 = x => {
    if (x > 0) {
        return x * x;
    }
    else {
        return - x * x;
    }
};
/*
var t2 = (x,y) =>{
    x * x + y * y
};//false 有{}就要加return
*/
var t2 = (x,y) =>x * x + y * y ;

console.log(t2(1,5));

var t3 = () => 3.14;

console.log(t3());//t3不加括号的话=> [Function}

var s1 = (x,y,...rest)  =>{
  var sum = x+y;
    for (var i of rest) {
        sum += i ;
    }
    return sum;
};

console.log(s1(1,2,2,3,4,124,6,2,5,5));

// SyntaxError: x => { foo: x }

var t4 = x => ({ foo: x }) ;

console.log(t4("** No.1!"));

var obj = {
    birth: 1996,
    getAge: function () {
        var b = this.birth;
        var fn = () => {//function NaN
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};

console.log(obj.getAge());

//work~
var o = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = function(y) { return y - this.birth}; // this.birth = 2000;
        return fn.call({birth:2000}, year);
    }
};

console.log(o.getAge(2001));

//no use
var ob = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - b; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};

console.log(ob.getAge(2015));

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        var that = this;
         var fn = function () {
            return{
                'Name': that.name,
                'Age': that.age
            }
         };
        return fn();
    },
    //this指针只在toJSON方法的函数内指向xiaoming，
    // 在函数内部定义的函数，this又指向undefined了！
    // （在非strict模式下，它重新指向全局对象window！）
    // 修复的办法也不是没有，我们用一个that变量首先捕获this
};

console.log(xiaoming.toJSON());