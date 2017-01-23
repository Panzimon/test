/**
 * Created by XYSM on 2017/1/24.
 */
/*
 用find()查找：

 var ul = $('ul.lang'); // 获得<ul>
 var dy = ul.find('.dy'); // 获得JavaScript, Python, Scheme
 var swf = ul.find('#swift'); // 获得Swift
 var hsk = ul.find('[name=haskell]'); // 获得Haskell
 如果要从当前节点开始向上查找，使用parent()方法：

 var swf = $('#swift'); // 获得Swift
 var parent = swf.parent(); // 获得Swift的上层节点<ul>
 var a = swf.parent('div.red'); // 从Swift的父节点开始向上查找，
 直到找到某个符合条件的节点并返回
 */

/*
 对于位于同一层级的节点，可以通过next()和prev()方法，例如：

 当我们已经拿到Swift节点后：

 var swift = $('#swift');

 swift.next(); // Scheme
 swift.next('[name=haskell]');
 // Haskell，因为Haskell是后续第一个符合选择器条件的节点

 swift.prev(); // Python
 swift.prev('.js');
 // JavaScript，因为JavaScript是往前第一个符合选择器条件的节点
 */

/*
 filter()方法可以过滤掉不符合选择器条件的节点：

 var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
 var a = langs.filter('.dy'); // 拿到JavaScript, Python, Scheme
 */

/*
 var langs = $('ul.lang li');
  // 拿到JavaScript, Python, Swift, Scheme和Haskell
 langs.filter(function () {
 return this.innerHTML.indexOf('S') === 0;
 // 返回S开头的节点
 });
 // 拿到Swift, Scheme
 */
/*
 map()方法把一个jQuery对象包含的若干DOM节点转化为其他对象：

 var langs = $('ul.lang li');
 // 拿到JavaScript, Python, Swift, Scheme和Haskell
 var arr = langs.map(function () {
 return this.innerHTML;//?不是应该是.html()吗-。-
 }).get(); // 用get()拿到包含string的Array：
 ['JavaScript', 'Python', 'Swift', 'Scheme', 'Haskell']
 */