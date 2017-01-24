/**
 * Created by XYSM on 2017/1/25.
 */

/*
 给jQuery对象绑定一个新方法是通过扩展$.fn对象实现的。
 让我们来编写第一个扩展——highlight1()：

 $.fn.highlight1 = function () {
 // this已绑定为当前jQuery对象:
 this.css('backgroundColor', '#fffceb')
 .css('color', '#d85030');
 return this;
 //为什么最后要
 return this;
 ？
 因为jQuery对象支持链式操作，
 我们自己写的扩展方法也要能继续链式下去
 }
 调用：
 $('#test-highlight1 span').highlight1();
 */

/*
 我们可以给方法加个参数，
 让用户自己把参数用对象传进去。
 于是我们有了第二个版本的highlight2()：

 $.fn.highlight2 = function (options) {
 // 要考虑到各种情况:
 // options为undefined
 // options只有部分key
 var bgcolor = options &&
 options.backgroundColor ||
 '#fffceb';
 var color = options && options.color ||
 '#d85030';
 this.css('backgroundColor', bgcolor)
 .css('color', color);
 return this;
 }

 对于默认值的处理，
 我们用了一个简单的&&和||短路操作符，总能得到一个有效的值
 */

/*
 另一种方法是使用jQuery提供的辅助方法
 $.extend(target, obj1, obj2, ...)，
 它把多个object对象的属性合并到第一个target对象中，
 遇到同名属性，总是使用靠后的对象的值，
 也就是越往后优先级越高：

 // 把默认值和用户传入的options合并到对象{}中并返回:
 var opts = $.extend({}, {
 backgroundColor: '#00a8e6',
 color: '#ffffff'
 }, options);
 */

/*
 最终版的highlight()终于诞生了：

 $.fn.highlight = function (options) {
 // 合并默认值和用户设定值:
 var opts = $.extend({}, $.fn.highlight.defaults, options);
 this.css('backgroundColor', opts.backgroundColor).css('color', opts.color);
 return this;
 }

 // 设定默认值:
 $.fn.highlight.defaults = {
 color: '#d85030',
 backgroundColor: '#fff8de'
 }
 这次用户终于满意了。用户使用时，只需一次性设定默认值：

 $.fn.highlight.defaults.color = '#fff';
 $.fn.highlight.defaults.backgroundColor = '#000';
 然后就可以非常简单地调用highlight()了
 */

/*
 <div id="test-highlight">
 <p>如何编写<span>jQuery</span> <span>Plugin</span></p>
 <p>编写<span>jQuery</span> <span>Plugin</span>，
 要设置<span>默认值</span>，并允许用户修改<span>默认值</span>，
 或者运行时传入<span>其他值</span>。</p>
 </div>
 实测一下修改默认值的效果：

 'use strict';

 $.fn.highlight.defaults.color = '#659f13';
 $.fn.highlight.defaults.backgroundColor = '#f2fae3';

 $('#test-highlight p:first-child span').highlight();

 $('#test-highlight p:last-child span').highlight({
 color: '#dd1144'
 });


 */
/*
 jQuery插件的原则：

 给$.fn绑定函数，实现插件的代码逻辑；
 插件函数最后要return this;以支持链式调用；
 插件函数要有默认值，绑定在$.fn.<pluginName>.defaults上；
 用户在调用时可传入设定值以便覆盖默认值。
 */