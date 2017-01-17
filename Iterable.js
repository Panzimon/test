/**
 * Created by ZY on 2017/1/17.
 */

var arr = [1,2,3];
for( var key of arr){
    console.log(key);
}

const a = ['a','s','d'];
const s = new Set(['A','S','D']);
const d = new Map( [ [1,'x'] , [0,'y'] , ['q',135] , ['p',s] ] );
a.bug = 'hahaha';
//error: a.length = "fuck";
a.length = 5;
a[4] = "pzy";
s.haha = 233 ;
d.data = "idk";

for (var x of a ){
    console.log(x);
}

for (var x of s){
    console.log(x);
}

for (var x of d){
    console.log(x);
}

for (var x in a ){
    console.log(x);
}

for (var x in s){
    console.log(x);
}

for (var x in d){
    console.log(x);
}

a.forEach(function (ele,index,arr) {
    console.log(ele + " "+ index);
});

