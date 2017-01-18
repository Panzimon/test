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

