/**
 * Created by ZY on 2017/1/18.
 */
var arr = [1,2,3,4,54,5,323245,437,65,'','dsf','qey',null,undefined,
'   '];
var fil = arr.filter(function (x) {
    return x % 2 !==0;
});
var fil2 = arr.filter(function (x) {
    return x && x.toString().trim();//trim IE9以下的版本没有
    //trim()只能处理字符串
});
var fil3 = arr.filter(function (ele,i,arr) {
    console.log(ele);
    console.log(i);
    console.log(arr);
    return true;
});

console.log(fil);
console.log(fil2);
console.log(fil3);

//利用filter，可以巧妙地去除Array的重复元素：


var
    r,
    arrr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

rr = arrr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});

console.log(rr.toString());

/*
 去除重复元素依靠的是indexOf总是返回第一个元素的位置，
 后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了。
 */

//素数1
function get_primes(arr) {

    return arr.filter(function(x){
        for(var i=2;i<x;i++){
            if(x%i==0){
                return false;
            }
        }
        return x !=1;
    });
}

//素数2
function get_primes(arr) {
    return arr.filter(function (element, index, root){
        if(element===1)return false;
        for(var i=2;i<=Math.sqrt(element);i++){
            if (element % i === 0) return false;
        }
        return true;
    });
}


