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
