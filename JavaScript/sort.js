/**
 * Created by ZY on 2017/1/18.
 */
console.log('sajfkduoiqioqufjeJHIOHFOIHFOHJE'.split("").sort());

var arr1 = [10, 20, 1, 2,22,22,45462,262];
var as1 = arr1.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});

console.log(as1);

var arr2 = ['Google', 'apple', 'Microsoft'];
var as2 = arr2.sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); // ['apple', 'Google', 'Microsoft']

console.log(as2);
console.log(arr2);
//!!!sort()方法会直接对Array进行修改，它返回的结果仍是当前Array
