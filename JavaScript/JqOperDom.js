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