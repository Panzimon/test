/**
 * Created by XYSM on 2017/1/25.
 */

/*
 var obj = {
 name: 'bob',
 school: 'No.1 middle school',
 address: 'xueyuan road'
 };

 var upper = _.map(obj, function (value, key) {
 return key+": "+value;
 });

 alert(JSON.stringify(upper));
 */

/*
 你也许会想，为啥对Object作map()操作的返回结果是Array？
 应该是Object才合理啊！把_.map换成_.mapObject再试试
 */
/*
 当集合的所有元素都满足条件时，
 _.every()函数返回true，
 当集合的至少一个元素满足条件时，_.some()函数返回true：

 'use strict';
 // 所有元素都大于0？
 _.every([1, 4, 7, -3, -9], (x) => x > 0); // false
 // 至少一个元素大于0？
 _.some([1, 4, 7, -3, -9], (x) => x > 0); // true
 */

/*
 当集合是Object时，我们可以同时获得value和key：

 'use strict';
 var obj = {
 name: 'bob',
 school: 'No.1 middle school',
 address: 'xueyuan road'
 };
 // 判断key和value是否全部是小写：


 var r1 = _.every(obj, function (value, key) {
 return !/[A-Z]+/.test(value)&&!/[A-Z]+/.test(key);
 });
 var r2 = _.some(obj, function (value, key) {
 return !/[A-Z]+/.test(value)&&!/[A-Z]+/.test(key);
 });

 alert('every key-value are lowercase: ' + r1 +
 '\nsome key-value are lowercase: ' + r2);
 */
//todo 大神答案
/*
 var r1 = _.every(obj, function (value, key) {
 return (/^[a-z\s.]+$/.test(value))&&(/^[a-z\s.]+$/.test(key));
 });
 var r2 = _.some(obj, function (value, key) {
 return (/^[a-z\s.]+$/.test(value))&&(/^[a-z\s.]+$/.test(key));
 });
 // todo 大神答案2
 var r1 = _.every(obj, function (value, key) {
 return (value+key).toLowerCase() === value+key;
 });
 var r2 = _.some(obj, function (value, key) {
 return (value+key).toLowerCase() === value+key;
 });
 */
/*
 var arr = [3, 5, 7, 9];
 _.max(arr); // 9
 _.min(arr); // 3

 // 空集合会返回-Infinity和Infinity，
 所以要先判断集合不为空：
 _.max([])
 -Infinity
 _.min([])
 Infinity
 注意，如果集合是Object，
 max()和min()只作用于value，忽略掉key：

 'use strict';
 _.max({ a: 1, b: 2, c: 3 });
 // 3
 */

/*
 groupBy()把集合的元素按照key归类，key由传入的函数返回：

 'use strict';

 var scores = [20, 81, 75, 40, 91,
 59, 77, 66, 72, 88, 99];
 var groups = _.groupBy(scores, function (x) {
 if (x < 60) {
 return 'C';
 } else if (x < 80) {
 return 'B';
 } else {
 return 'A';
 }
 });
 // 结果:
 // {
 //   A: [81, 91, 88, 99],
 //   B: [75, 77, 66, 72],
 //   C: [20, 40, 59]
 // }
 */
/*
 shuffle()用洗牌算法随机打乱一个集合：

 'use strict';
 // 注意每次结果都不一样：
 _.shuffle([1, 2, 3, 4, 5, 6]); // [3, 5, 4, 6, 2, 1]
 */
/*
 sample()则是随机选择一个或多个元素：

 'use strict';
 // 注意每次结果都不一样：
 // 随机选1个：
 _.sample([1, 2, 3, 4, 5, 6]); // 2
 // 随机选3个：
 _.sample([1, 2, 3, 4, 5, 6], 3); // [6, 1, 4]
 */