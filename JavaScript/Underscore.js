/**
 * Created by XYSM on 2017/1/25.
 */

/*
 ，Array有map()和filter()方法，
 可是Object没有这些方法。此外，
 低版本的浏览器例如IE6～8也没有这些方法，怎么办？

 方法一，自己把这些方法添加到Array.prototype中，
 然后给Object.prototype也加上mapObject()等类似的方法。

 方法二，直接找一个成熟可靠的第三方开源库，
 使用统一的函数来实现map()、filter()这些操作。

 我们采用方法二，选择的第三方库就是underscore
 */

/*
 jQuery在加载时，会把自身绑定到唯一的全局变量$上，
 underscore与其类似，会把自身绑定到唯一的全局变量_上，
 这也是为啥它的名字叫underscore的原因
 */
/*
 用underscore实现map()操作如下：

 'use strict';
 _.map([1, 2, 3], (x) => x * x);
 // [1, 4, 9]
 咋一看比直接用Array.map()要麻烦一点，
 可是underscore的map()还可以作用于Object：

 'use strict';
 _.map({ a: 1, b: 2, c: 3 }, (v, k) => k + '=' + v);
 // ['a=1', 'b=2', 'c=3']
 */