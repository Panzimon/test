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

