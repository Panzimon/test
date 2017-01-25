/**
 * Created by XYSM on 2017/1/25.
 */
var _ = require('underscore');
var arr = [2,235,6,24,7,2,7,14,63];
console.log(arr);
console.log(_.first(arr));

/*
 flatten()接收一个Array，
 无论这个Array里面嵌套了多少个Array，
 flatten()最后都把它们变成一个一维数组：
 */

console.log(_.flatten([1, [2,5684], [3, [[4], [5]]]]));

//zip()把两个或多个数组的所有元素按索引对齐，
// 然后按索引合并成新数组。
// 例如，你有一个Array保存了名字，
// 另一个Array保存了分数，
// 现在，要把名字和分数给对上，
// 用zip()轻松实现：


var names = ['Adam', 'Lisa', 'Bart'];
var scores = [85, 92, 59];
console.log(_.zip(names, scores));

//unzip()则是反过来：
var namesAndScores = [['Adam', 85],
    ['Lisa', 92], ['Bart', 59]];
console.log(_.unzip(namesAndScores));

//有时候你会想，与其用zip()，为啥不把名字和分数直接对应成Object呢？
// 别急，object()函数就是干这个的
console.log( _.object(names, scores));

//range()让你快速生成一个序列，不再需要用for循环实现了：


// 从0开始小于10:
_.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 从1开始小于11：
_.range(1, 11); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 从0开始小于30，步长5:
console.log(_.range(0, 30, 5)); // [0, 5, 10, 15, 20, 25]

// 从0开始大于-10，步长-1:
_.range(0, -10, -1);
// [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]