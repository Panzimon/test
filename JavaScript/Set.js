var s1 = new Set();
var s2 = new Set([1,2,3]);

console.log(s1);
console.log(s2);

var s = new Set([1,2,3,3,'3','4']);
console.log(s);
console.log(3 == '3');// === false

s.add(4);
console.log(s);