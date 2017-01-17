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

var q = new Map([[1,[2,3,4]]]);
//u can't new Map([1,2,3,4])or new Map([[1,2,3,4]])→this will go to Map {1 => 2},
//that means it will ignore the arguments behind the second ","
console.log(q);