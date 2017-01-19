/**
 * Created by ZY on 2017/1/19.
 */
function* typesth(){
  yield  typeof 123; // 'number'
  yield  typeof NaN; // 'number'
  yield  typeof 'str'; // 'string'
  yield  typeof true; // 'boolean'
  yield  typeof undefined; // 'undefined'
  yield  typeof Math.abs; // 'function'
  yield  typeof null; // 'object'
  yield  typeof []; // 'object'
  yield  typeof {}; // 'object'
    return true;//如果不加这一句最后还会next一次done才是true，
    // 而且value是undefined
};
var t = typesth();
console.log(t.next());
console.log(t.next());
console.log(t.next());
console.log(t.next());
console.log(t.next());
console.log(t.next());
console.log(t.next());
console.log(t.next());
console.log(t.next());
console.log(t.next());

/*
 //simple
 for(var i of t){
 console.log(i);
 }
 */

/*
包装对象
 typeof new Number(123); // 'object'
 new Number(123) === 123; // false

 typeof new Boolean(true); // 'object'
 new Boolean(true) === true; // false

 typeof new String('str'); // 'object'
 new String('str') === 'str'; // false
 */

/*
不加new 的话就差不多是类型转换
 */

/*
 总结一下，有这么几条规则需要遵守：

 不要使用new Number()、new Boolean()、new String()创建包装对象；

 用parseInt()或parseFloat()来转换任意类型到number；

 用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；

 通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；

 typeof操作符可以判断出number、boolean、string、function和undefined；

 判断Array要使用Array.isArray(arr)；

 判断null请使用myVar === null；

 判断某个全局变量是否存在用typeof window.myVar === 'undefined'；

 函数内部判断某个变量是否存在用typeof myVar === 'undefined'。

 最后有细心的同学指出，任何对象都有toString()方法吗？null和undefined就没有！

 确实如此，这两个特殊值要除外，虽然null还伪装成了object类型。
 */

//123.toString(); // SyntaxError
//遇到这种情况，要特殊处理一下：

123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'

