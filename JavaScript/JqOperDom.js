/**
 * Created by XYSM on 2017/1/24.
 */
/*
 <ul id="test-ul">
 <li class="js">JavaScript</li>
 <li name="book">Java &amp; JavaScript</li>
 </ul>
 分别获取文本和HTML：

 $('#test-ul li[name=book]').text();
 // 'Java & JavaScript'
 $('#test-ul li[name=book]').html();
 // 'Java &amp; JavaScript'
 */

/*
 var j1 = $('#test-ul li.js');
 var j2 = $('#test-ul li[name=book]');

 j1.html('<span style="color: red">JavaScript</span>');
 j2.text('JavaScript & ECMAScript');
 */


/*
 一个jQuery对象可以包含0个或任意个DOM对象，
 它的方法实际上会作用在对应的每个DOM节点上。
 */
/*
 所以jQuery对象的另一个好处是我们可以执行一个操作，
 作用在对应的一组DOM节点上。即使选择器没有返回任何DOM节点，
 调用jQuery对象的方法仍然不会报错：

 // 如果不存在id为not-exist的节点：
 $('#not-exist').text('Hello'); //
  代码不报错，没有节点被设置为'Hello'
 这意味着jQuery帮你免去了许多if语句。
 */
/*
 调用jQuery对象的css('name', 'value')方法，我们用一行语句实现：

 'use strict';

 $('#test-css li.dy>span')
 .css('background-color', '#ffd351')
 .css('color', 'red');
 jQuery对象的所有方法都返回
 一个jQuery对象（可能是新的也可能是自身），
 这样我们可以进行链式调用，非常方便
 */
/*
 var div = $('#test-div');
 div.css('color'); // '#000033', 获取CSS属性
 div.css('color', '#336699'); // 设置CSS属性
 div.css('color', ''); // 清除CSS属性
 */
/*
 为了和JavaScript保持一致，
 CSS属性可以用'background-color'
 和'backgroundColor'两种格式
 */
/*
 css()方法将作用于DOM节点的style属性，
 具有最高优先级。如果要修改class属性，
 可以用jQuery提供的下列方法：

 var div = $('#test-div');
 div.hasClass('highlight');
 // false， class是否包含highlight
 div.addClass('highlight');
  // 添加highlight这个class
 div.removeClass('highlight');
  // 删除highlight这个class
 */
/*
 var div = $('#test-highlight-css');
 // TODO:
 div.find('.js').css('color', 'red')
 .css('background-color', 'orange');

 div.find('.js').addClass("highlight");
 */
/*
 我们可以设置CSS的display属性为none，利用css()方法就可以实现。
 不过，要显示这个DOM就需要恢复原有的display属性，
 这就得先记下来原有的display属性到底是block还是inline还是别的值。

 考虑到显示和隐藏DOM元素使用非常普遍，
 jQuery直接提供show()和hide()方法，
 我们不用关心它是如何修改display属性的，总之它能正常工作
 */

/*
 // 浏览器可视窗口大小:
 $(window).width(); // 800
 $(window).height(); // 600

 // HTML文档大小:
 $(document).width(); // 800
 $(document).height(); // 3500

 // 某个div的大小:
 var div = $('#test-div');
 div.width(); // 600
 div.height(); // 300
 div.width(400);
 // 设置CSS属性 width: 400px，是否生效要看CSS是否有效
 div.height('200px');
 // 设置CSS属性 height: 200px，是否生效要看CSS是否有效
 */

/*
 // <div id="test-div" name="Test" start="1">...</div>
 var div = $('#test-div');
 div.attr('data'); // undefined, 属性不存在
 div.attr('name'); // 'Test'
 div.attr('name', 'Hello'); // div的name属性变为'Hello'
 div.removeAttr('name'); // 删除name属性
 div.attr('name'); // undefined
 */

/*
 prop()方法和attr()类似，
 但是HTML5规定有一种属性在DOM节点中可以没有值，只有出现与不出现两种，例如：

 <input id="test-radio" type="radio" name="test" checked value="1">
 等价于：

 <input id="test-radio" type="radio" name="test" checked="checked" value="1">
 attr()和prop()对于属性checked处理有所不同：

 var radio = $('#test-radio');
 radio.attr('checked'); // 'checked'
 radio.prop('checked'); // true
 prop()返回值更合理一些。不过，用is()方法判断更好：

 var radio = $('#test-radio');
 radio.is(':checked'); // true
 类似的属性还有selected，处理时最好用is(':selected')。
 */