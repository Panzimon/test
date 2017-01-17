/**
 * Created by ZY on 2017/1/17.
 */

function abs() {
    'use strict'
    if (arguments.length === 0) {
        console.log(0);
    }
    else{
        let x = arguments[0];
        console.log( x > 0 ? x : -x);
    }
    //不加else的话if下面的还会执行，x又被打印一次
}
abs(); // 0
abs(10); // 10
abs(-9); // 9

function fooes5 (a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

//等同于

//function fooes6(a, b, ...rest) {
// 不知道为什么node出错，在浏览器不出错。。。
 //   'use strict'
 //   console.log('a = ' + a);
 //   console.log('b = ' + b);
//    console.log(rest);
// }

fooes5(1,2,3,4,5,6,76);
//fooes6(1,43,34,4545,453,54,11);

/*
'use strict';
function sum(...rest) {
    var s=0;
    for (var x of rest)
    {
        s+=x;
    }
    return s;
}//求和
// 测试:
var i, args = [];
for (i=1; i<=100; i++) {
    args.push(i);
}
if (sum() !== 0) {
    alert('测试失败: sum() = ' + sum());
} else if (sum(1) !== 1) {
    alert('测试失败: sum(1) = ' + sum(1));
} else if (sum(2, 3) !== 5) {
    alert('测试失败: sum(2, 3) = ' + sum(2, 3));
} else if (sum.apply(null, args) !== 5050) {
    alert('测试失败: sum(1, 2, 3, ..., 100) = ' + sum.apply(null, args));
} else {
    alert('测试通过!');
}
*/

