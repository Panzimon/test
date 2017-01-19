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
