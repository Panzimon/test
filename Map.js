var m = new Map([['Michael',95],['Bob',75],['Tracy',85]]);
console.log(m.get('Michael'));

var x = new Map();
console.log(x.set('Adam',67));
console.log(x.set("Bob",59));
console.log(x.has('Adam'));
console.log(x.get('Adam'));
console.log(x.delete('Adam'));
console.log(m.get('Adam'));
//一个key对一个value，重复定义后面覆盖前面